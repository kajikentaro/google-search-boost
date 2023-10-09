import { isInViewport } from "./is-in-viewport";
import { max, min } from "./min-max";

const REMOVABLE_TAG = "REMOVABLE_ELEMENT_FOR_EXTENSION";
const REMOVABLE_TAG_SELECTOR = `.${REMOVABLE_TAG}`;

export class PointerController {
  private targetList: HTMLElement[];
  private nowIdx = 0;
  private isEnable = true;

  constructor(targetList: HTMLElement[], focusedIdx: number = 0) {
    this.targetList = targetList;
    this.nowIdx = focusedIdx;
    if (targetList.length === 0) {
      console.error("targetList is empty");
      this.isEnable = false;
      return;
    }
    this.insertArrow();
    this.focusOnLink(true);
    this.scrollToViewport();
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

  public getIdx() {
    return this.nowIdx;
  }

  public destroy() {
    this.removePointer();
  }

  public up() {
    if (!this.isEnable) return;
    this.nowIdx = max(this.nowIdx - 1, 0);
    this.removePointer();
    this.insertArrow();
    this.focusOnLink();
  }

  public down() {
    if (!this.isEnable) return;
    this.nowIdx = min(this.nowIdx + 1, this.targetList.length - 1);
    this.removePointer();
    this.insertArrow();
    this.focusOnLink();
  }

  private scrollToViewport() {
    const target = this.targetList[this.nowIdx];
    if (isInViewport(target)) return;
    if (this.nowIdx === 0) {
      target.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
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
