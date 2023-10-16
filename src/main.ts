import { shouldBeSameFontColorAs1st, shouldBeVisibleElements, shouldHaveLink } from "modules/filters";
import { KeyEventMapper } from "modules/keyEventMapper";
import { PointerController } from "modules/pointers";

function getH3Elements() {
  const h3Elements: HTMLElement[] = [];
  const queryRes = document.querySelectorAll("#center_col h3");
  // covert to array list
  queryRes.forEach((v) => {
    if (v instanceof HTMLElement) {
      h3Elements.push(v);
    }
  });
  return h3Elements;
}

function filterElements(all: HTMLElement[]) {
  const filters = [shouldBeVisibleElements, shouldHaveLink, shouldBeSameFontColorAs1st];
  let res = all;
  for (const filter of filters) {
    res = filter(res);
  }
  return res;
}

function main(keyEventMapper: KeyEventMapper) {
  let mainContentH3Length = -1;
  let pointer: PointerController;
  setInterval(() => {
    const h3Elements = getH3Elements();
    const mainContentH3 = filterElements(h3Elements);

    if (mainContentH3Length === mainContentH3.length) return;
    if (mainContentH3Length === -1) {
      // first render
      mainContentH3Length = mainContentH3.length;
      pointer = new PointerController(mainContentH3);
      return;
    }

    // when updated view (when 'see more' was clicked)
    mainContentH3Length = mainContentH3.length;
    const focusedIdx = pointer.getIdx();
    pointer.destroy();
    pointer = new PointerController(mainContentH3, focusedIdx);
  }, 500);

  window.addEventListener("keydown", (v) => {
    if (!(v.target instanceof HTMLElement)) {
      throw new Error("v.target is not HTMLElement");
    }
    const ignoreType = ["TEXTAREA"];
    if (ignoreType.includes(v.target.tagName)) {
      return;
    }

    const isWithCtrlKey = v.metaKey || v.ctrlKey;
    const event = keyEventMapper.keyToEvent(v.key, isWithCtrlKey);

    let didAction = false;
    switch (event) {
      case "up":
        pointer.up();
        didAction = true;
        break;
      case "down":
        pointer.down();
        didAction = true;
        break;
      case "right":
        movePage(10);
        didAction = true;
        break;
      case "left":
        movePage(-10);
        didAction = true;
        break;
      default:
        ((neverAssert: never) => {})(event);
    }

    if (didAction) {
      v.preventDefault();
    }
  });
}

function movePage(difference: number) {
  const url = new URL(window.location.href);
  const nowIdx = parseInt(url.searchParams.get("start") || "0");
  const newIdx = nowIdx + difference;
  if (newIdx < 0) return;
  url.searchParams.set("start", newIdx.toString());
  document.location.href = url.toString();
}

// dependency injection
main(new KeyEventMapper());
