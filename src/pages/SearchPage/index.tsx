import { useRawTranslate } from '@/hooks/useTranslate';
import { ActivityIndicator } from 'antd-mobile';
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Latest } from './components/Latest';
import { SearchResult } from './components/SearchResult';

export function SearchPage() {
  const [search, setSearch] = useState('');
  const [namespace, setNamespace] = useState<string[]>([]);
  const { loading } = useRawTranslate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ActivityIndicator animating size="large" text="加载数据..." />
      </div>
    );
  }

  return (
    <div>
      <Header onSearch={setSearch} onNamespacesChange={setNamespace} />
      <div className="p-2 text-gray-900">
        {search ? <SearchResult search={search} namespaces={namespace} /> : <Latest />}
      </div>
    </div>
  );
}
