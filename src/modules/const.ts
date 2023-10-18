export type StorageKeys = "keybindings" | "keybindings-pages" | "keybindings-focus-search";

export const KEY_SETTING_CURSOR = ["jk", "upDown", "ctrlUpDown", "ctrlJk"] as const;
export type KeyCursor = (typeof KEY_SETTING_CURSOR)[number];

export const KEY_SETTING_PAGES = ["none", "hl", "leftRight", "ctrlHl", "ctrlLeftRight"] as const;
export type KeyPages = (typeof KEY_SETTING_PAGES)[number];

export const KEY_SETTING_FOCUS_SEARCH = ["slash", "ctrlSlash"] as const;
export type KeyFocusSearch = (typeof KEY_SETTING_FOCUS_SEARCH)[number];
