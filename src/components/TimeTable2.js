import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import sbulogo from '../images/sbu.jpg';
import "../css/TimeTable.css";

export const TimeTable2 = () => {
    const navigate = useNavigate();

    const goToMain = () => {
        navigate('/');
    };
    const goToAMS = () => {
        navigate('/TimeTable1');
    };
    const goToBM = () => {
        navigate('/TimeTable2');
    };
    const goToCS = () => {
        navigate('/TimeTable3');
    };
    const goToECE = () => {
        navigate('/TimeTable4');
    };
    const goToMEC = () => {
        navigate('/TimeTable5');
    };
    const goToTSM = () => {
        navigate('/TimeTable6');
    };

    return (
        <div className="container">
            <img src={sbulogo} className="sbulogo"/>
            <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 text-center ">
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link onClick={goToMain}>Home</Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="Select Department" id="nav-dropdown">
                            <NavDropdown.Item onClick={goToAMS}>AMS</NavDropdown.Item>
                            <NavDropdown.Item onClick={goToBM}>BM</NavDropdown.Item>
                            <NavDropdown.Item onClick={goToCS}>CS</NavDropdown.Item>
                            <NavDropdown.Item onClick={goToECE}>ECE</NavDropdown.Item>
                            <NavDropdown.Item onClick={goToMEC}>MEC</NavDropdown.Item>
                            <NavDropdown.Item onClick={goToTSM}>TSM</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <h2 className="display-18 display-md-16 display-lg-14 mb-0">Time Table (BM)</h2>
            </div>
            <div className="row">
                <div className="col-md-12" style={{ marginTop: '1%' }}>
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
                                        <h4>BM 10111</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <Row className="justify-content-md-center">
                                                <Col xs={12} md={4}>
                                                    <h4>BM 101</h4>
                                                    <p>Francois Rameu</p>
                                                    <span>Room Number</span>
                                                </Col>
                                                <Col xs={12} md={4}>
                                                    <h4>BM 101</h4>
                                                    <p>Francois Rameu</p>
                                                    <span>Room Number</span>
                                                </Col>
                                            </Row>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td className="day">10:30 - 11:50</td>
                                    <td className="active">
                                        <h4>BM 114</h4>
                                        <p>Antonino Mione</p>
                                        <div className="hover">
                                            <h4>Cycling</h4>
                                            <p>Antonino Mione</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="day">12:30 - 01:50</td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="day">02:00 - 03:20</td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="day">03:30 - 04:50</td>
                                    <td></td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td className="day">05:00 - 06:20</td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
                                            <p>Francois Rameu</p>
                                            <span>Room Number</span>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className="active">
                                        <h4>BM 101</h4>
                                        <p>Francois Rameu</p>
                                        <div className="hover">
                                            <h4>BM 101</h4>
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

export default TimeTable2;
