import { KEY_SETTING_CURSOR, KEY_SETTING_PAGES, KeyCursor, KeyPages } from "./const";
import { getStringFromStorage } from "./storage";

export type EventType = "up" | "down" | "right" | "left";

export class KeyEventMapper {
  private settingCursor: KeyCursor = "jk";
  private settingPages: KeyPages = "hl";
  constructor() {
    this.readKeySettingsFromStorage();
  }

  private async readKeySettingsFromStorage() {
    {
      const res = await getStringFromStorage("keybindings");
      if (!res) {
        return;
      }
      const key = res as KeyCursor;
      if (!KEY_SETTING_CURSOR.includes(key)) {
        throw new Error(`unknown value was found in storage: ${res}`);
      }
      this.settingCursor = key;
    }

    {
      const res = await getStringFromStorage("keybindings-pages");
      if (!res) {
        return;
      }
      const key = res as KeyPages;
      if (!KEY_SETTING_PAGES.includes(key)) {
        throw new Error(`unknown value was found in storage: ${res}`);
      }
      this.settingPages = key;
    }
  }

  public keyToEvent(key: string, withCtrl: boolean): EventType | undefined {
    const candidates = [
      SETTING_MAPPER_CURSOR.find((v) => v.savedKey === this.settingCursor),
      SETTING_MAPPER_PAGES.find((v) => v.savedKey === this.settingPages),
    ].filter((v) => v);

    for (const v of candidates) {
      if (v.withCtrl !== withCtrl) continue;
      if (v.keyToEvent[key]) {
        return v.keyToEvent[key];
      }
    }
    return undefined;
  }
}

interface SettingMapper<SavedKey, EventType> {
  savedKey: SavedKey;
  keyToEvent: Record<string, EventType>;
  withCtrl: boolean;
}
const SETTING_MAPPER_CURSOR: SettingMapper<KeyCursor, "up" | "down">[] = [
  {
    savedKey: "jk",
    keyToEvent: {
      k: "up",
      j: "down",
    },
    withCtrl: false,
  },
  {
    savedKey: "upDown",
    keyToEvent: {
      ArrowUp: "up",
      ArrowDown: "down",
    },
    withCtrl: false,
  },
  {
    savedKey: "ctrlJk",
    keyToEvent: {
      k: "up",
      j: "down",
    },
    withCtrl: true,
  },
  {
    savedKey: "ctrlUpDown",
    keyToEvent: {
      ArrowUp: "up",
      ArrowDown: "down",
    },
    withCtrl: true,
  },
];

const SETTING_MAPPER_PAGES: SettingMapper<KeyPages, "left" | "right">[] = [
  {
    savedKey: "none",
    keyToEvent: {
      "definitely unmatched key up": "left",
      "definitely unmatched key down": "right",
    },
    withCtrl: false,
  },
  {
    savedKey: "hl",
    keyToEvent: {
      h: "left",
      l: "right",
    },
    withCtrl: false,
  },
  {
    savedKey: "leftRight",
    keyToEvent: {
      ArrowLeft: "left",
      ArrowRight: "right",
    },
    withCtrl: false,
  },
  {
    savedKey: "ctrlHl",
    keyToEvent: {
      h: "left",
      l: "right",
    },
    withCtrl: true,
  },
  {
    savedKey: "ctrlLeftRight",
    keyToEvent: {
      ArrowLeft: "left",
      ArrowRight: "right",
    },
    withCtrl: true,
  },
];
