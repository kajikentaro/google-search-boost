import { PreferenceKeyBindings } from "modules/const";
import { getStringFromStorage, setStringToStorage } from "modules/storage";

type Elements = Record<string, HTMLInputElement>;

async function main() {
  const elements: Elements = {
    jk: document.getElementById("jk") as HTMLInputElement,
    upDown: document.getElementById("up-down") as HTMLInputElement,
    ctrlUpDown: document.getElementById("ctrl-up-down") as HTMLInputElement,
    ctrlJk: document.getElementById("ctrl-jk") as HTMLInputElement,
  } satisfies Record<PreferenceKeyBindings, HTMLInputElement>;

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

main();
