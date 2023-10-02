export function shouldBeSameFontColorAs1st(elements: HTMLElement[]): HTMLElement[] {
  function getFontColor(e: HTMLElement) {
    return window.getComputedStyle(e).color;
  }
  if (elements.length === 0) {
    return [];
  }
  const character = getFontColor(elements[0]);

  // remove elements that don't have same character as the 1st element
  const res: HTMLElement[] = [];
  for (const e of elements) {
    if (getFontColor(e) === character) {
      res.push(e);
    }
  }
  return res;
}

export function shouldBeVisibleElements(elements: HTMLElement[]): HTMLElement[] {
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

export function shouldHaveLink(elements: HTMLElement[]) {
  return elements.filter((now) => {
    while (now !== document.body) {
      if (now.tagName === "A") {
        return true;
      }
      now = now.parentElement;
    }
    return false;
  });
}
