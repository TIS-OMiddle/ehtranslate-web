import { useTranslate } from '@/hooks/useTranslate';
import React, { useMemo } from 'react';

export function Latest() {
  const { data } = useTranslate();
  const messages = useMemo(() => {
    const texts: any[] = data.head.message.split('\n');
    return texts.map((text, index) => <div key={index}>{text}</div>);
  }, []);
  return (
    <div>
      <div className="text-xl">最近更新:</div>
      {messages}
    </div>
  );
}
