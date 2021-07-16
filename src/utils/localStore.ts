import localforage from 'localforage';

export const localStore = localforage.createInstance({
  name: 'ehtranslate-web',
  driver: localforage.INDEXEDDB,
});
