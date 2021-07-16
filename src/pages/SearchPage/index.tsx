import { useTranslate } from '@/hooks/useTranslate';
import { ActivityIndicator } from 'antd-mobile';
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Latest } from './components/Latest';

export function SearchPage() {
  const [text, setText] = useState('');
  const { loading } = useTranslate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ActivityIndicator animating size="large" text="加载数据..." />
      </div>
    );
  }

  return (
    <div>
      <Header onSearch={setText} />
      <div className="p-4 text-gray-900">
        <Latest />
        {text}
      </div>
    </div>
  );
}
