import React from 'react';
import { TranslateContextProvider } from './hooks/useTranslate';
import { SearchPage } from './pages/SearchPage';

function App() {
  return (
    <TranslateContextProvider>
      <SearchPage />
    </TranslateContextProvider>
  );
}

export default App;
