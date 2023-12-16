import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';

export default () => (
  <Routes>
    <Route path="/*" element={<Landing/>} />
  </Routes>
);

