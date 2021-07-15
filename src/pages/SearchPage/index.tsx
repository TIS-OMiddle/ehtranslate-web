import React, { useState } from 'react';
import { Header } from './components/Header';

export function SearchPage() {
  const [text, setText] = useState('');
  return (
    <div>
      <Header onSearch={setText} />
      {text}
    </div>
  );
}
