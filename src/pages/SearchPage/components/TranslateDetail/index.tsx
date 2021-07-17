import { Button, Toast } from 'antd-mobile';
import Clipboard from 'clipboard';
import React from 'react';

const clipboard = new Clipboard('.copy-btn');

clipboard.on('success', e => {
  Toast.success(`复制 '${e.text}' 成功`);
  e.clearSelection();
});
clipboard.on('error', e => {
  Toast.fail(`复制 '${e.text}' 失败`);
});

interface TranslateDetailProps {
  info: {
    name: {
      text: string;
    };
    intro: {
      html: string;
    };
  } & {
    key: string;
    namespace: string;
  };
}

export function TranslateDetail({ info }: TranslateDetailProps) {
  return (
    <div className="flex flex-col p-2 bg-pink-200 mb-2 rounded shadow">
      <div className="flex justify-end items-center">
        <span className="mr-1 font-semibold">{info.name.text}</span>
        <Button inline size="small" type="primary">
          <button className="copy-btn" data-clipboard-text={`${info.namespace}:"${info.key}"`}>
            复制
          </button>
        </Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: info.intro.html }} />
    </div>
  );
}
