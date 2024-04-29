import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import sbulogo from '../images/sbu.jpg';
import "../css/TimeTable.css";
// import axios from 'axios';

export const TimeTable1 = () => {

    const [department, setDepartment] = useState('AMS');
    const [year, setYear] = useState('24');
    const [semester, setSemester] = useState('F');
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    const [fileFound, setFileFound] = useState(false);
    
    useEffect(() => {
        // const fetchCourses = async () => {
        //     try {
        //         const response = await fetch('http://127.0.0.1:5000/courses');
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         const data = await response.json();
        //         setCourses(data);
        //     } catch (error) {
        //         console.error("There was an error fetching the courses data: ", error);
        //     }
        // };
        // fetchCourses();
        handleCheckAndProcess();
    }, [semester, year, department]);

    // const change_ams = () => {
    //     setDepartment('AMS')
    // }

    // const change_semester = () => {
    //     setSemester('F')
    // }

    // const change_year = () => {
    //     setYear('22')
    // }

    const handleCheckAndProcess = async () => {

        const url = 'http://localhost:5000/check-and-process?department=' + department + '&year=' + year + '&semester=' + semester
        try {
            const response = await fetch(url);

            if (!response.ok) {
                setCourses([])
                setFileFound(false);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setCourses(data.data);
            setMessage(data.message);
            setFileFound(true);
            console.log('Data:', data.data); 
            console.log(data.message)
            console.log(semester)
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error fetching data');
        }
    };

    const navigate = useNavigate();

    const goToMain = () => {
        navigate('/');
    };
    const goToAMS = () => {
        // navigate('/TimeTable1');
        setDepartment('AMS')
    };
    const goToBM = () => {
        // navigate('/TimeTable2');
        setDepartment('BM')
    };
    const goToCS = () => {
        // navigate('/TimeTable3');
        setDepartment('CSE')
    };
    const goToECE = () => {
        // navigate('/TimeTable4');
        setDepartment('ECE')
    };
    const goToMEC = () => {
        // navigate('/TimeTable5');
        setDepartment('MEC')
    };
    const goToTSM = () => {
        // navigate('/TimeTable6');
        setDepartment('TSM')
    };
    const goToFSC = () => {
        setDepartment('FSC')
    }

    const goToList = () => {
        navigate('/List');
    };
    const goTo24F = () => {
        // navigate('/Table24F');
        setYear('24')
        setSemester('F')
    };
    const goTo24S = () => {
        // navigate('/Table24S');
        setYear('24')
        setSemester('S')
    };
    const goTo23F = () => {
        // navigate('/Table24S');
        setYear('23')
        setSemester('F')
    };
    const goTo23S = () => {
        // navigate('/Table24S');
        setYear('23')
        setSemester('S')
    };
    const goTo22F = () => {
        // navigate('/Table24S');
        setYear('22')
        setSemester('F')
    };
    const goToCSV = () => {
        window.location.href = 'http://127.0.0.1:5000';
    };

    return (
        <div className="container">
            <img src={sbulogo} className="sbulogo" />
            <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 text-center ">
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link onClick={goToMain}>Home</Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                        <Nav.Link onClick={goToList}>List</Nav.Link>
                    </Nav.Item> */}
                    {/* {(year=='24')&&(semester=='F')&&(<Nav.Item>
                        <Nav.Link onClick={goToCSV}>Input CSV</Nav.Link>
                    </Nav.Item>)} */}
                    <NavDropdown title="Department" id="nav-dropdown">
                        <NavDropdown.Item onClick={goToAMS}>AMS</NavDropdown.Item>
                        <NavDropdown.Item onClick={goToBM}>BM</NavDropdown.Item>
                        <NavDropdown.Item onClick={goToCS}>CS</NavDropdown.Item>
                        <NavDropdown.Item onClick={goToECE}>ECE</NavDropdown.Item>
                        <NavDropdown.Item onClick={goToMEC}>MEC</NavDropdown.Item>
                        <NavDropdown.Item onClick={goToTSM}>TSM</NavDropdown.Item>
                        <NavDropdown.Item onClick={goToFSC}>FSC</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Semester" id="nav-dropdown">
                        <NavDropdown.Item onClick={goTo24F}>2024F</NavDropdown.Item>
                        <NavDropdown.Item onClick={goTo24S}>2024S</NavDropdown.Item>
                        <NavDropdown.Item onClick={goTo23F}>2023F</NavDropdown.Item>
                        <NavDropdown.Item onClick={goTo23S}>2023S</NavDropdown.Item>
                        <NavDropdown.Item onClick={goTo22F}>2022F</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <h2 className="display-18 display-md-16 display-lg-14 mb-0">Time Table {!fileFound && " Not Updated"} ({department}) ({year}{semester})</h2>
            </div>
            <div className="row">
                <div className="col-md-12" style={{ marginTop: '1.5%' }}>
                    <div className="schedule-table wide-container">
                        <table className="table bg-white">
                            {/* 윗줄  */}
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
                            {/* 바디  */}
                            <tbody>
                                <tr>
                                    {/* Class #1================================================= */}
                                    <td className="day">09:00 - 10:20</td>
                                    {/* Mon1 */}
                                    <td className="my-active" style={{ padding: '5px' }}>
                                        <div>
                                            {courses.filter(course => course.Days === "MW" && course['Start Time'] === "9:00 AM").length > 0 ?
                                                courses.map((course, index) => (
                                                    course.Days === "MW" && course['Start Time'] === "9:00 AM" && (
                                                        <div key={index}>
                                                            {course.Subj}
                                                            {course.CRS}
                                                            {'-    -'}
                                                            {course.Instructor}
                                                            {'-    -'}
                                                            {course.Room}
                                                        </div>
                                                    )
                                                ))
                                                :
                                                <div className="course-display">
                                                    <div className="detail-course" draggable="true" onDragStart={(event) => event.dataTransfer.setData("text/plain", null)}>
                                                        <div className="course-number">CSE 316</div>
                                                        <div className="professor-name">Mione</div>
                                                        <div className="room-number">B 105</div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </td>
                                    {/* Tue1*/}
                                    <td className="active">
                                        <h4>Tue 9AM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "9:00 AM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "9:00 AM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Wed1 */}
                                    <td className="active">
                                        <h4>Wed 9AM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "9:00 AM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "9:00 AM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Thu1 */}
                                    <td className="active">
                                        <h4>Thu 9AM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "9:00 AM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "9:00 AM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Fir1 */}
                                    <td className="active">
                                        <h4>Fri 9AM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "F" && course['Start Time'] === "9:00 AM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "9:00 AM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* Class #2================================================= */}
                                    <td className="day">10:30 - 11:50</td>
                                    {/* Mon2 */}
                                    <td className="active">
                                        <h4>Mon 1030</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "10:30 AM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "10:30 AM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Tue2 */}
                                    <td className="active">
                                        <h4>Tue 1030</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "10:30 AM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "10:30 AM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Wed2 */}
                                    <td className="active">
                                        <h4>Wed 1030</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "10:30 AM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "10:30 AM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Thu2 */}
                                    <td className="active">
                                        <h4>Thu 1030</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "10:30 AM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "10:30 AM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Fri2 */}
                                    <td className="active">
                                        <h4>Fri 1030</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "F" && course['Start Time'] === "10:30 AM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "F" && course['Start Time'] === "10:30 AM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* Class #3================================================= */}
                                    <td className="day">12:30 - 01:50</td>
                                    {/* Mon3  */}
                                    <td className="active">
                                        <h4>Mon 1230</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "12:30 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "12:30 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Tue3 */}
                                    <td className="active">
                                        <h4>Tue 1230</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "12:30 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "12:30 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Wed3 */}
                                    <td className="active">
                                        <h4>Wed 1230</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "12:30 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "12:30 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Thu3 */}
                                    <td className="active">
                                        <h4>Thu 1230</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "12:30 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "12:30 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Fri3 */}
                                    <td className="active">
                                        <h4>Fri 1230</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "F" && course['Start Time'] === "12:30 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "F" && course['Start Time'] === "12:30 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* Class #4================================================= */}
                                    <td className="day">02:00 - 03:20</td>
                                    {/* Mon 4 */}
                                    <td className="active">
                                        <h4>Mon 2PM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "2:00 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "2:00 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Tue 4 */}
                                    <td className="active">
                                        <h4>Tue 2PM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "2:00 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "2:00 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Wed 4 */}
                                    <td className="active">
                                        <h4>Wed 2PM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "2:00 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "2:00 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Thu 4 */}
                                    <td className="active">
                                        <h4>Thu 2PM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "2:00 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "2:00 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Fri 4 */}
                                    <td className="active">
                                        <h4>Fri 2PM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "F" && course['Start Time'] === "2:00 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "F" && course['Start Time'] === "2:00 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* Class #5================================================= */}
                                    <td className="day">03:30 - 04:50</td>
                                    {/* Mon 5 */}
                                    <td className="active">
                                        <h4>Mon 3:30</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "3:30 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "3:30 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Tue 5 */}
                                    <td className="active">
                                        <h4>Tue 3:30</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "3:30 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "3:30 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Wed 5 */}
                                    <td className="active">
                                        <h4>Wed 3:30</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "3:30 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "3:30 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Thu 5 */}
                                    <td className="active">
                                        <h4>Thu 3:30</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "3:30 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "3:30 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Fri 5 */}
                                    <td className="active">
                                        <h4>Fri 3:30</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "F" && course['Start Time'] === "3:30 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "F" && course['Start Time'] === "3:30 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {/* Class #6================================================= */}
                                    <td className="day">05:00 - 06:20</td>
                                    {/* Mon 6 */}
                                    <td className="active">
                                        <h4>Mon 5PM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "5:00 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "5:00 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Tue 6 */}
                                    <td className="active">
                                        <h4>Tue 5PM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "5:00 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "5:00 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Wed 6 */}
                                    <td className="active">
                                        <h4>Wed 5PM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "MW" && course['Start Time'] === "5:00 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "MW" && course['Start Time'] === "5:00 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Thu 6 */}
                                    <td className="active">
                                        <h4>Thu 5PM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "TUTH" && course['Start Time'] === "5:00 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "TUTH" && course['Start Time'] === "5:00 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                    {/* Fri 6 */}
                                    <td className="active">
                                        <h4>Fri 5PM</h4>
                                        <p>Prof Name</p>
                                        <div className="hover">
                                            <ul>
                                                {courses.filter(course => course.Days === "F" && course['Start Time'] === "5:00 PM").length > 0 ?
                                                    courses.map((course, index) => (
                                                        course.Days === "F" && course['Start Time'] === "5:00 PM" && (
                                                            <li key={index}>
                                                                {course.Subj}
                                                                {course.CRS}
                                                                {'-    -'}
                                                                {course.Instructor}
                                                                {'-    -'}
                                                                {course.Room}
                                                            </li>
                                                        )
                                                    ))
                                                    :
                                                    <li>No Class</li>
                                                }
                                            </ul>
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
