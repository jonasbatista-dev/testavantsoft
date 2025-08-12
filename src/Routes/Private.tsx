import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddClient from '@/Pages/client/Add';
import ListClient from '@/Pages/client/List';
import Report from '@/Pages/Report';

const RoutesMain: React.FC = () => {
  return (
    <Routes>
      <Route path="/client/add/:id?" element={<AddClient />} />
      <Route path="/client/list" element={<ListClient />} />
      <Route path="/report" element={<Report />} />
      <Route path="*" element={<Navigate to={'/client/list'} />} />
    </Routes>
  );
};

export default RoutesMain;
