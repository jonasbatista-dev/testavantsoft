import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddTasks from './Pages/Tasks/Add';
import ListTasks from './Pages/Tasks/List';
import Report from './Pages/Report';

// import { Container } from './styles';

const RoutesMain: React.FC = () => {
  return (
    <Routes>
      <Route path="/form/:id?" element={<AddTasks />} />
      <Route path="/list" element={<ListTasks />} />
      <Route path="/report" element={<Report />} />
      <Route path="/" element={<Navigate to={'/list'} />} />
    </Routes>
  );
};

export default RoutesMain;
