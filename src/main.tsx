import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { RelatoriosListPage } from './page/RelatoriosList';
import { RelatorioDetalhePage } from './page/RelatorioDetalhe';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/relatorios" element={<RelatoriosListPage />} />
        <Route path="/relatorios/:id" element={<RelatorioDetalhePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
