import { PointerController } from "modules/Pointers";

function getVisible(elements: HTMLElement[]): HTMLElement[] {
  function isHidden(element: HTMLElement): boolean {
    if (window.getComputedStyle(element).display === "none") {
      return true;
    }
    if (element === document.body) {
      return false;
    }
    return isHidden(element.parentElement);
  }

  const visibleElements: HTMLElement[] = [];
  for (const e of elements) {
    if (!isHidden(e)) {
      visibleElements.push(e);
    }
  }
  return visibleElements;
}

function removeSidebarElement(elements: HTMLElement[]): HTMLElement[] {
  // TODO: adjust
  function getCharacter(e: HTMLElement) {
    return window.getComputedStyle(e).color;
  }
  if (elements.length === 0) {
    return [];
  }
  const character = getCharacter(elements[0]);

  // remove elements that don't have same character as the 1st element
  const res: HTMLElement[] = [];
  for (const e of elements) {
    if (getCharacter(e) === character) {
      res.push(e);
    }
  }
  return res;
}

function main() {
  const allH3NodeList = document.querySelectorAll("#search h3");

  // covert to array list
  const allH3Array: HTMLElement[] = [];
  allH3NodeList.forEach((v) => {
    if (v instanceof HTMLElement) {
      allH3Array.push(v);
    }
  });

  const visibleH3 = getVisible(allH3Array);
  const mainContentH3 = removeSidebarElement(visibleH3);

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
