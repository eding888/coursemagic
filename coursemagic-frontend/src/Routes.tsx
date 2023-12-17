import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

export default () => (
  <Routes>
    <Route path="/*" element={<Landing/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
  </Routes>
);

