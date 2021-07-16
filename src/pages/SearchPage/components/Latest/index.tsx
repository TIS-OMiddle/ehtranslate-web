import { useRawTranslate } from '@/hooks/useTranslate';
import React, { useMemo } from 'react';

export function Latest() {
  const { data } = useRawTranslate();
  const messages = useMemo(() => {
    const texts: any[] = data.head.message.split('\n');
    return texts.map((text, index) => <div key={index}>{text}</div>);
  }, [data]);

  return (
    <div>
      <div className="text-xl">最近更新:</div>
      {messages}
    </div>
  );
}
