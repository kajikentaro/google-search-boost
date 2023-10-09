import { KEYBOARD_EVENT_MAPPER, PREFERENCE_KEY_BINDINGS, PreferenceKeyBindings } from "modules/const";
import { shouldBeSameFontColorAs1st, shouldBeVisibleElements, shouldHaveLink } from "modules/filters";
import { PointerController } from "modules/pointers";
import { getStringFromStorage } from "modules/storage";

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

let withCtrlKey = false;
let keyboardEventMapper = KEYBOARD_EVENT_MAPPER.jk;

async function getKeybindings() {
  const res = await getStringFromStorage("keybindings");
  if (!res) {
    return;
  }
  if (!PREFERENCE_KEY_BINDINGS.includes(res)) {
    throw new Error(`unknown value was found in storage: ${res}`);
  }
  const keyBindings = res as PreferenceKeyBindings;
  if (keyBindings === "ctrlJk" || keyBindings === "ctrlUpDown") {
    withCtrlKey = true;
  }
  keyboardEventMapper = KEYBOARD_EVENT_MAPPER[keyBindings];
}

function main() {
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

  getKeybindings();

  window.addEventListener("keydown", (v) => {
    if (!(v.target instanceof HTMLElement)) {
      throw new Error("v.target is not HTMLElement");
    }
    const ignoreType = ["TEXTAREA"];
    if (ignoreType.includes(v.target.tagName)) {
      return;
    }
    if (withCtrlKey) {
      if (!(v.metaKey || v.ctrlKey)) {
        return;
      }
    } else {
      if (v.metaKey || v.ctrlKey) {
        return;
      }
    }
    let didAction = false;
    if (v.key === keyboardEventMapper.up) {
      pointer.up();
      didAction = true;
    }
    if (v.key === keyboardEventMapper.down) {
      pointer.down();
      didAction = true;
    }
    if (v.key === keyboardEventMapper.right) {
      // go to next page
      movePage(10);
      didAction = true;
    }
    if (v.key === keyboardEventMapper.left) {
      // go to previous page
      movePage(-10);
      didAction = true;
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

main();
