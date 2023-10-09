export type StorageKeys = "keybindings";

const TMP_PREFERENCE_KEY_BINDINGS = ["jk", "upDown", "ctrlUpDown", "ctrlJk"] as const;
export type PreferenceKeyBindings = (typeof TMP_PREFERENCE_KEY_BINDINGS)[number];
export const PREFERENCE_KEY_BINDINGS: string[] = ["jk", "upDown", "ctrlUpDown", "ctrlJk"] satisfies typeof TMP_PREFERENCE_KEY_BINDINGS;

type KeyboardEventMapper = Record<PreferenceKeyBindings, Record<"up" | "down" | "right" | "left", string>>;
export const KEYBOARD_EVENT_MAPPER: KeyboardEventMapper = {
  jk: {
    up: "k",
    down: "j",
    right: "l",
    left: "h",
  },
  upDown: {
    up: "ArrowUp",
    down: "ArrowDown",
    right: "ArrowRight",
    left: "ArrowLeft",
  },
  ctrlUpDown: {
    up: "ArrowUp",
    down: "ArrowDown",
    right: "ArrowRight",
    left: "ArrowLeft",
  },
  ctrlJk: {
    up: "k",
    down: "j",
    right: "l",
    left: "h",
  },
};
