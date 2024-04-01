import React from "react";
import "../css/Calendar.css";

export const Calendar = () => {
  // Example days and slots - you can make this dynamic as per your requirements
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const slots = ["9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "1:00 - 2:00", "2:00 - 3:00"];

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
                    <td key={day}>-</td> // Placeholder for actual events or tasks
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
