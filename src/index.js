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
import Login from './components/Login';
import Profile from './components/Profile';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes> {/* Define your routes here */}
        <Route path="/" element={<MainPage />} />
        <Route path="/Preference" element={<Preference />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/TimeTable1" element={<TimeTable1 />} />
        <Route path="/TimeTable2" element={<TimeTable2 />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();