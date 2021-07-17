import { localStore } from '@/utils/localStore';
import React, { useCallback, useContext, useMemo } from 'react';
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
const TranslateContext = React.createContext({ ...defaultValue, refetchData: () => {} });

async function getData(force = false) {
  let res: any = await localStore.getItem(TRANSLATE_KEY);
  if (res && !force) {
    res = JSON.parse(res);
  } else {
    res = await (
      await fetch('https://cdn.jsdelivr.net/gh/EhTagTranslation/DatabaseReleases@master/db.full.json')
    ).json();
    localStore.setItem(TRANSLATE_KEY, JSON.stringify(res));
  }
  return res;
}

export const TranslateContextProvider: React.FC = ({ children }) => {
  const [value, setValue] = useState(defaultValue);

  const refetchData = useCallback(() => {
    setValue(defaultValue);
    getData(true).then(data => setValue({ data, loading: false }));
  }, []);

  useEffect(() => {
    getData().then(data => setValue({ data, loading: false }));
  }, []);

  return <TranslateContext.Provider value={{ ...value, refetchData }}>{children}</TranslateContext.Provider>;
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
