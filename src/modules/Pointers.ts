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
  }

  public down() {
    this.nowIdx = (this.nowIdx + 1) % this.targetList.length;
    this.removePointer();
    this.insertArrow();
    this.focusOnLink();
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