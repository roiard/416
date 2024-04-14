import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import reportWebVitals from './javascript/reportWebVitals';
import MainPage from './components/MainPage';
import Preference from './components/Preference';
import Calendar from './components/Calendar';
import TimeTable1 from './components/TimeTable1';
import TimeTable2 from './components/TimeTable2';
import TimeTable3 from './components/TimeTable3';
import TimeTable4 from './components/TimeTable4';
import TimeTable5 from './components/TimeTable5';
import TimeTable6 from './components/TimeTable6';
import AdminTable from './components/AdminTable';

import Table24S from './components/pastTable/24S';
import Table23F from './components/pastTable/23F';
import Table23S from './components/pastTable/23S';
import Table22F from './components/pastTable/22F';
import Table22S from './components/pastTable/22S';

import List from './components/List';
import Login from './components/Login';
import Profile from './components/Profile';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Preference" element={<Preference />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/TimeTable1" element={<TimeTable1 />} />
        <Route path="/TimeTable2" element={<TimeTable2 />} />
        <Route path="/TimeTable3" element={<TimeTable3 />} />
        <Route path="/TimeTable4" element={<TimeTable4 />} />
        <Route path="/TimeTable5" element={<TimeTable5 />} />
        <Route path="/TimeTable6" element={<TimeTable6 />} />
        <Route path="/AdminTable" element={<AdminTable />} />

        <Route path="/Table24S" element={<Table24S />} />
        <Route path="/Table23F" element={<Table23F />} />
        <Route path="/Table23S" element={<Table23S />} />
        <Route path="/Table22F" element={<Table22F />} />
        <Route path="/Table22S" element={<Table22S />} />

        <Route path="/List" element={<List />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();