import { StorageKeys } from "./const";

export const getStringFromStorage = async (key: StorageKeys): Promise<string | undefined> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], (items) => {
      resolve(items[key]);
    });
  });
};

export const setStringToStorage = async (key: StorageKeys, value: string) => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value }).then(resolve);
  });
};
