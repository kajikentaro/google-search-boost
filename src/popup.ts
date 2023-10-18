import { KeyCursor, KeyFocusSearch, KeyPages } from "modules/const";
import { getStringFromStorage, setStringToStorage } from "modules/storage";

async function keybindingsCursor() {
  const elements: Record<KeyCursor, HTMLInputElement> = {
    jk: document.getElementById("jk") as HTMLInputElement,
    upDown: document.getElementById("up-down") as HTMLInputElement,
    ctrlJk: document.getElementById("ctrl-jk") as HTMLInputElement,
    ctrlUpDown: document.getElementById("ctrl-up-down") as HTMLInputElement,
  };

  Object.entries(elements).forEach(([key, element]) => {
    element.addEventListener("click", () => {
      setStringToStorage("keybindings", key);
    });
  });

  const selected = await getStringFromStorage("keybindings");
  const selectedElement = elements[selected as KeyCursor];
  if (selectedElement) {
    selectedElement.checked = true;
  } else {
    elements.jk.checked = true;
  }
}

async function keybindingsPages() {
  const elements: Record<KeyPages, HTMLInputElement> = {
    none: document.getElementById("none") as HTMLInputElement,
    hl: document.getElementById("hl") as HTMLInputElement,
    leftRight: document.getElementById("left-right") as HTMLInputElement,
    ctrlLeftRight: document.getElementById("ctrl-left-right") as HTMLInputElement,
    ctrlHl: document.getElementById("ctrl-hl") as HTMLInputElement,
  };

  Object.entries(elements).forEach(([key, element]) => {
    element.addEventListener("click", () => {
      setStringToStorage("keybindings-pages", key);
    });
  });

  const selected = await getStringFromStorage("keybindings-pages");
  const selectedElement = elements[selected as KeyPages];
  if (selectedElement) {
    selectedElement.checked = true;
  } else {
    elements.none.checked = true;
  }
}

async function keybindingsFocusSearch() {
  const elements: Record<KeyFocusSearch, HTMLInputElement> = {
    slash: document.getElementById("slash") as HTMLInputElement,
    ctrlSlash: document.getElementById("ctrl-slash") as HTMLInputElement,
  };

  Object.entries(elements).forEach(([key, element]) => {
    element.addEventListener("click", () => {
      setStringToStorage("keybindings-focus-search", key);
    });
  });

  const selected = await getStringFromStorage("keybindings-focus-search");
  const selectedElement = elements[selected as KeyFocusSearch];
  if (selectedElement) {
    selectedElement.checked = true;
  } else {
    elements.slash.checked = true;
  }
}

// register click events in the popup.html
function main() {
  keybindingsCursor();
  keybindingsPages();
  keybindingsFocusSearch();
}

main();
