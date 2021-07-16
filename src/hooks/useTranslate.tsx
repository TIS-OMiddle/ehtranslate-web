import { localStore } from '@/utils/localStore';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';

const TRANSLATE_KEY = 'TRANSLATE_KEY';

const defaultValue = { data: null as any, loading: true };
const TranslateContext = React.createContext(defaultValue);

async function getData() {
  let res: any = await localStore.getItem(TRANSLATE_KEY);
  if (res) {
    res = JSON.parse(res);
  } else {
    res = await (await fetch('/data/db.full.json')).json();
    localStore.setItem(TRANSLATE_KEY, JSON.stringify(res));
  }
  return res;
}

export const TranslateContextProvider: React.FC<{}> = ({ children }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    getData().then(data => setValue({ data, loading: false }));
  }, []);

  return <TranslateContext.Provider value={value}>{children}</TranslateContext.Provider>;
};

export function useTranslate() {
  return useContext(TranslateContext);
}
