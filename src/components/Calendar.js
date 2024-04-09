import React from "react";
import "../css/Calendar.css";

export const Calendar = () => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const slots = ["09:00 - 10:20", "10:30 - 11:50", "12:30 - 01:50", "02:00 - 03:20", "03:30 - 04:50", "05:00 - 06:20"];

  return (
    <div className="main-page">
      <div className="group">
        
        <div className="text-wrapper">Calendar</div>
        <div className="timetable">
          <table>
            <thead>
              <tr>
                <th>Time / Day</th>
                {days.map(day => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map(slot => (
                <tr key={slot}>
                  <td>{slot}</td>
                  {days.map(day => (
                    <td key={day}>-</td> 
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Calendar;
