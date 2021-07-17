import { TranslateDataItem, useTranslate } from '@/hooks/useTranslate';
import React from 'react';
import { useMemo } from 'react';
import { TranslateDetail } from '../TranslateDetail';

export function SearchResult({ search, namespaces }: { search: string; namespaces: string[] }) {
  const data = useTranslate();

  const list = useMemo(() => {
    if (!search) return [];
    const typeList = data.filter(item => !namespaces.length || namespaces.includes(item.namespace));
    const filteredList = typeList.map(item => {
      const res: (TranslateDataItem['keyMap'][string] & { key: string; namespace: string })[] = [];
      item.keys.forEach(key => {
        const detail = item.keyMap[key];
        if (detail.name.text.includes(search)) {
          res.push({ namespace: item.namespace, key, ...detail });
        }
      });
      return res;
    });
    return filteredList.flat();
  }, [data, search, namespaces]);

  return (
    <>
      {list.map(info => (
        <TranslateDetail key={info.key} info={info} />
      ))}
    </>
  );
}
