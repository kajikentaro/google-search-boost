import { shouldBeSameFontColorAs1st, shouldBeVisibleElements } from "modules/Filters";
import { PointerController } from "modules/Pointers";

function getH3Elements() {
  const h3Elements: HTMLElement[] = [];
  const queryRes = document.querySelectorAll("#search h3");
  // covert to array list
  queryRes.forEach((v) => {
    if (v instanceof HTMLElement) {
      h3Elements.push(v);
    }
  });
  return h3Elements;
}

function filterElements(all: HTMLElement[]) {
  const filters = [shouldBeVisibleElements, shouldBeSameFontColorAs1st];
  let res = all;
  for (const filter of filters) {
    res = filter(res);
  }
  return res;
}

function main() {
  const h3Elements = getH3Elements();
  const mainContentH3 = filterElements(h3Elements);

  const pointer = new PointerController(mainContentH3);

  window.addEventListener("keypress", (v) => {
    if (!(v.target instanceof HTMLElement)) {
      throw new Error("v.target is not HTMLElement");
    }
    const ignoreType = ["TEXTAREA"];
    if (ignoreType.includes(v.target.tagName)) {
      return;
    }
    if (v.key === "k") {
      pointer.up();
    }
    if (v.key === "j") {
      pointer.down();
    }
    if (v.key === "l") {
      // got to next page
      movePage(10);
    }
    if (v.key === "h") {
      movePage(-10);
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

main();
