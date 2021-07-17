import { localStore } from '@/utils/localStore';
import React, { useContext, useMemo } from 'react';
import { useEffect, useState } from 'react';

export type TranslateDataItem = {
  count: number;
  namespace: string;
  name: string;
  description: string;
  keys: string[];
  keyMap: Record<string, { name: { text: string }; intro: { html: string } }>;
};
export type TranslateData = TranslateDataItem[];

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

export function useRawTranslate() {
  return useContext(TranslateContext);
}

export function useTranslate(): TranslateData {
  const {
    data: { data },
  } = useRawTranslate();
  return useMemo(() => {
    return data
      .filter(item => item.namespace !== 'rows')
      .map(item => ({
        count: item.count,
        namespace: item.namespace,
        name: item.frontMatters.name,
        description: item.frontMatters.description,
        keys: Object.keys(item.data),
        keyMap: item.data,
      }));
  }, [data]);
}
