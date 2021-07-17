import { useRawTranslate } from '@/hooks/useTranslate';
import { Button } from 'antd-mobile';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

export function Latest() {
  const { data, refetchData } = useRawTranslate();
  const messages = useMemo(() => {
    const texts: any[] = data.head.message.split('\n');
    return texts.map((text, index) => <div key={index}>{text}</div>);
  }, [data]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span>最近更新:&nbsp;{dayjs(data.head.author.when).format('YYYY-MM-DD HH:mm:ss')}</span>
        <Button inline size="small" type="primary" onClick={refetchData}>
          更新
        </Button>
      </div>
      {messages}
    </div>
  );
}
