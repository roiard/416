import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../css/TimeTable1.css";

export const TimeTable1 = () => {
  return (
    <div className="container">
      <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 text-center">
        <h2 className="display-18 display-md-16 display-lg-14 mb-0">Time Table (CS)</h2>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="schedule-table wide-container">
            <table className="table bg-white">
              <thead>
                <tr>
                  <th>Time \ Day</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th className="last">Fri</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="day">09:00 - 10:20</td>
                  <td className="active">
                    <h4>CSE 10111</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <Row className="justify-content-md-center">
                        <Col xs={12} md={4}>
                          <h4>CSE 101</h4>
                          <p>Francois Rameu</p>
                          <span>Room Number</span>
                        </Col>
                        <Col xs={12} md={4}>
                          <h4>CSE 101</h4>
                          <p>Francois Rameu</p>
                          <span>Room Number</span>
                        </Col>
                      </Row>
                    </div>
                  </td>
                  <td></td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td className="day">10:30 - 11:50</td>
                  <td className="active">
                    <h4>CSE 114</h4>
                    <p>Antonino Mione</p>
                    <div className="hover">
                      <h4>Cycling</h4>
                      <p>Antonino Mione</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td></td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="day">12:30 - 01:50</td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="day">02:00 - 03:20</td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td></td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td></td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="day">03:30 - 04:50</td>
                  <td></td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td></td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td className="day">05:00 - 06:20</td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td></td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                  <td></td>
                  <td className="active">
                    <h4>CSE 101</h4>
                    <p>Francois Rameu</p>
                    <div className="hover">
                      <h4>CSE 101</h4>
                      <p>Francois Rameu</p>
                      <span>Room Number</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable1;
