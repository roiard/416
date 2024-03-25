import React from "react";
import prefimg from '../images/prefimg.jpg';
import "../css/Calendar.css";

export const Calendar = () => {
  return (
    <div className="main-page">
      <div className="group">
        
        <div className="text-wrapper">Calendar</div>
        <img src={prefimg} className="pref-image"/>

      </div>
    </div>
  );
};

export default Calendar;
