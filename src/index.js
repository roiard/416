import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './css/index.css';
import reportWebVitals from './javascript/reportWebVitals';
import MainPage from './components/MainPage';
// import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Preference from './components/Preference';
import Calendar from './components/Calendar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes> {/* Define your routes here */}
        <Route path="/" element={<MainPage />} />
        <Route path="/Preference" element={<Preference />} />
        <Route path="/Calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();