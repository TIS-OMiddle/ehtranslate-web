import { Button, Toast } from 'antd-mobile';
import Clipboard from 'clipboard';
import React from 'react';

const clipboard = new Clipboard('.copy-btn');

clipboard.on('success', function (e) {
  Toast.success(`复制 '${e.text}' 成功`);
  e.clearSelection();
});
clipboard.on('error', function (e) {
  Toast.fail(`复制 '${e.text}' 失败`);
});

interface TranslateDetailProps {
  id: string;
  namespace: string;
  name: string;
  intro: string;
}

export function TranslateDetail({ intro, id, name, namespace }: TranslateDetailProps) {
  return (
    <div className="flex items-center p-2 bg-pink-200 mb-2 rounded shadow">
      <span className="flex-1 mr-1">
        <span className="font-semibold mr-1">{name}:</span>
        <span>
          {namespace}:{id}
        </span>
      </span>
      <Button inline size="small" type="primary">
        <button className="copy-btn" data-clipboard-text={`${namespace}:"${id}"`}>
          复制
        </button>
      </Button>
    </div>
  );
}
