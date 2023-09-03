const REMOVABLE_TAG = "REMOVABLE_ELEMENT_FOR_EXTENSION";
const REMOVABLE_TAG_SELECTOR = `.${REMOVABLE_TAG}`;

export class PointerController {
  private targetList: HTMLElement[];
  private nowIdx = 0;

  constructor(targetList: HTMLElement[]) {
    this.targetList = targetList;
    if (targetList.length === 0) {
      throw new Error("targetList is empty");
    }
    this.insertArrow();
    this.focusOnLink(true);
  }

  private async insertArrow() {
    const target = this.targetList[this.nowIdx];

    const arrowImage = chrome.runtime.getURL("arrow.png");
    const arrowHTMLText = `
      <span class="${REMOVABLE_TAG} arrow-wrapper">
        <img src="${arrowImage}"/>
      </span>`;
    target.insertAdjacentHTML("afterbegin", arrowHTMLText);
  }

  private removePointer() {
    document.querySelectorAll(REMOVABLE_TAG_SELECTOR).forEach((v) => {
      v.remove();
    });
  }

  public up() {
    this.nowIdx = (this.nowIdx - 1 + this.targetList.length) % this.targetList.length;
    this.removePointer();
    this.insertArrow();
    this.focusOnLink();
    this.scroll();
  }

  public down() {
    this.nowIdx = (this.nowIdx + 1) % this.targetList.length;
    this.removePointer();
    this.insertArrow();
    this.focusOnLink();
    this.scroll();
  }

  private scroll() {
    const target = this.targetList[this.nowIdx];

    const HEADER_MARGIN = 100;
    const FOOTER_MARGIN = 100;
    function isOutOfViewport(target: HTMLElement) {
      const windowHeight = window.innerHeight;
      const shouldScrollUp = target.getBoundingClientRect().top < HEADER_MARGIN;
      const shouldScrollDown = target.getBoundingClientRect().bottom > windowHeight - FOOTER_MARGIN;
      return shouldScrollUp || shouldScrollDown;
    }

    if (!isOutOfViewport(target)) {
      return;
    }

    const pxFromView = target.getBoundingClientRect().top;
    const pxFromWindow = pxFromView + window.scrollY;
    const pxWithHeader = pxFromWindow - HEADER_MARGIN;

    window.scroll({ top: pxWithHeader, behavior: "smooth" });
  }

  private focusOnLink(preventScroll: boolean = false) {
    const target = this.targetList[this.nowIdx];

    let now = target;
    while (now !== document.body) {
      if (now.tagName === "A") {
        if (preventScroll) {
          now.focus({ preventScroll: true });
        } else {
          now.focus({ preventScroll: false });
        }
        return;
      }
      now = now.parentElement;
    }
    console.error("failed to focus on following element");
    console.error(target);
  }
}
