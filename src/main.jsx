import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import Genre from './genre/Genre.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/genres" replace />} />
        <Route path="/genres" element={<Genre />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
