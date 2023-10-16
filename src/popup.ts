import { KeyCursor, KeyPages } from "modules/const";
import { getStringFromStorage, setStringToStorage } from "modules/storage";

type Elements = Record<string, HTMLInputElement>;

async function keybindingsCursor() {
  const elements: Elements = {
    jk: document.getElementById("jk") as HTMLInputElement,
    upDown: document.getElementById("up-down") as HTMLInputElement,
    ctrlJk: document.getElementById("ctrl-jk") as HTMLInputElement,
    ctrlUpDown: document.getElementById("ctrl-up-down") as HTMLInputElement,
  } satisfies Record<KeyCursor, HTMLInputElement>;

  Object.entries(elements).forEach(([key, element]) => {
    element.addEventListener("click", () => {
      setStringToStorage("keybindings", key);
    });
  });

  const selected = await getStringFromStorage("keybindings");
  const selectedElement = elements[selected];
  if (selectedElement) {
    selectedElement.checked = true;
  } else {
    elements.jk.checked = true;
  }
}

async function keybindingsPages() {
  const elements: Elements = {
    none: document.getElementById("none") as HTMLInputElement,
    hl: document.getElementById("hl") as HTMLInputElement,
    leftRight: document.getElementById("left-right") as HTMLInputElement,
    ctrlLeftRight: document.getElementById("ctrl-left-right") as HTMLInputElement,
    ctrlHl: document.getElementById("ctrl-hl") as HTMLInputElement,
  } satisfies Record<KeyPages, HTMLInputElement>;

  Object.entries(elements).forEach(([key, element]) => {
    element.addEventListener("click", () => {
      setStringToStorage("keybindings-pages", key);
    });
  });

  const selected = await getStringFromStorage("keybindings-pages");
  const selectedElement = elements[selected];
  if (selectedElement) {
    selectedElement.checked = true;
  } else {
    elements.none.checked = true;
  }
}

// register click events in the popup.html
function main() {
  keybindingsCursor();
  keybindingsPages();
}

main();
