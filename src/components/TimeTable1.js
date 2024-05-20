import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import sbulogo from '../images/sbu.jpg';
import "../css/TimeTable.css";

export const TimeTable1 = () => {

    const [departments, setDepartments] = useState(['AMS']);
    const [year, setYear] = useState('24');
    const [semester, setSemester] = useState('F');
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    const [fileFound, setFileFound] = useState(false);

    useEffect(() => {
        handleCheckAndProcess();
    }, [semester, year, departments]);

    const handleCheckAndProcess = async () => {
        let allCourses = [];
        let messages = [];

        for (const department of departments) {
            const url = `http://localhost:5000/check-and-process?department=${department}&year=${year}&semester=${semester}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                allCourses = [...allCourses, ...data.data];
                messages.push(data.message);
                setFileFound(true);
            } catch (error) {
                console.error('Error:', error);
                setMessage('Error fetching data');
                setFileFound(false);
            }
        }

        setCourses(allCourses);
        setMessage(messages.join(', '));
    };

    const navigate = useNavigate();

    const goToMain = () => {
        navigate('/');
    };

    const handleDepartmentChange = (e) => {
        const value = e.target.value;
        if (departments.includes(value)) {
            setDepartments(departments.filter(dep => dep !== value));
        } else if (departments.length < 2) {
            setDepartments([...departments, value]);
        }
    };

    const handleSemesterChange = (e) => {
        const [year, semester] = e.target.value.split('-');
        setYear(year);
        setSemester(semester);
    };

    const CourseDisplay = function ({ inputdays, inputtime, inputreci }) {
        // inputdays = "MW, TUTH, F", inputtime = "9:00 AM", inputreci = "RECM, RECTU, RECW, RECTH, RECF", inputday2 = "M, TU, W, TU, F"
        // const textToColor = (nuSubj    //     num = (num * 1234567) % 999999;
        //     return '#' + String(num).padStart(6, '0');
        // }
        const textToColor = (text) => {
            let hash = 0;
            for (let i = 0; i < text.length; i++) {
                hash = text.charCodeAt(i) + ((hash << 11) - hash);
            }
            let color = '#';
            for (let i = 0; i < 3; i++) {
                let value = (hash >> (i * 8)) & 0xFF;
                color += ('00' + value.toString(16)).substr(-2);
            }
            return color;
        }

        const findComplementary = (hexColor) => {
            hexColor = hexColor.replace('#', '');
            let r = parseInt(hexColor.substring(0, 2), 16);
            let g = parseInt(hexColor.substring(2, 4), 16);
            let b = parseInt(hexColor.substring(4, 6), 16);
            r = 255 - r;
            g = 255 - g;
            b = 255 - b;
            r = r.toString(16).padStart(2, '0');
            g = g.toString(16).padStart(2, '0');
            b = b.toString(16).padStart(2, '0');
            return '#' + r + g + b;
        }

        // 색 설정
        // return (
        //     <div className="course-display" style={{ backgroundColor: '#f0f1f3' }}>
        //         {courses.filter(course => course.Days === inputdays && course['Start Time'] === inputtime).map((course, index) => (
        //             course.Days === inputdays && course['Start Time'] === inputtime && (
        //                 <div className="detail-course" draggable="true" key={index} style={{ backgroundColor: textToColor(course['Subj']), color: findComplementary(textToColor(course['Subj'])) }}>
        //                     <div className="course-number">{course.Subj} {course.CRS}</div>
        //                     <div className="room-number">{course.Room}</div>
        //                     <div className="hover" style={{ backgroundColor: textToColor(course['Subj']), color: findComplementary(textToColor(course['Subj'])), maxWidth: '150%', height: '140%' }}>
        //                         <div className="course-number">{course.Subj} {course.CRS}</div>
        //                         <div>{course['Course Title']}</div>
        //                         <div className="professor-name">{course.Instructor}</div>
        //                         <div className="room-number">{course.Room}</div>
        //                     </div>
        //                 </div>
        //             )
        //         ))}
        //         {courses.filter(course => course['Cmp'] === "REC").map((course, index) => (
        //             course['Cmp'] === "REC" && course.Days === inputreci && course['Start Time'] === inputtime && (
        //                 <div className="detail-course reci-class" draggable="true" key={index} style={{ backgroundColor: textToColor(course['Subj']), color: findComplementary(textToColor(course['Subj'])) }}>
        //                     <div className="course-number">{course.Subj} {course.CRS}</div>
        //                     <div className="room-number">{course.Room}</div>
        //                     <div className="hover" style={{ backgroundColor: textToColor(course['Subj']), color: findComplementary(textToColor(course['Subj'])) }}>
        //                         <div className="course-number">{course.Subj} {course.CRS}</div>
        //                         <div>{course['Course Title']}</div>
        //                         <div className="professor-name">{course.Instructor}</div>
        //                         <div className="room-number">{course.Room}</div>
        //                     </div>
        //                 </div>
        //             )
        //         ))}
        //     </div>
        // );
        return (
            <div className="course-display" style={{ backgroundColor: '#f0f1f3' }}>
                {courses.filter(course => course.Days === inputdays && course['Start Time'] === inputtime).map((course, index) => (
                    course.Days === inputdays && course['Start Time'] === inputtime && (
                        <div className={`detail-course ${course.Subj}`} draggable="true" key={index} style={{ color: 'rgb(50, 50, 50)' }}>
                            <div className="course-number">{course.Subj} {course.CRS}</div>
                            <div className="room-number">{course.Room}</div>
                            <div className={`hover ${course.Subj}`} style={{ maxWidth: '150%', height: '140%', zIndex: '99' }}>
                                <div className="course-number">{course.Subj} {course.CRS}</div>
                                <div>{course['Course Title']}</div>
                                <div className="professor-name">{course.Instructor}</div>
                                <div className="room-number">{course.Room}</div>
                            </div>
                        </div>
                    )
                ))}
                {courses.filter(course => course['Cmp'] === "REC").map((course, index) => (
                    course['Cmp'] === "REC" && course.Days === inputreci && course['Start Time'] === inputtime && (
                        <div className={`detail-course reci-class ${course.Subj}`} draggable="true" key={index}>
                            <div className="course-number">{course.Subj} {course.CRS}</div>
                            <div className="room-number">{course.Room}</div>
                            <div className={`hover ${course.Subj}`} style={{ maxWidth: '150%', height: '140%' }}>
                                <div className="course-number">{course.Subj} {course.CRS}</div>
                                <div>{course['Course Title']}</div>
                                <div className="professor-name">{course.Instructor}</div>
                                <div className="room-number">{course.Room}</div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        );
    }

    return (
        <div className="container" style={{ marginLeft: '8em', marginTop: '0em' }}>
            <img src={sbulogo} className="sbulogo" />
            <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 text-center " style={{ paddingTop: '1em', paddingBottom: '0.5em' }}>
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link onClick={goToMain}>Home</Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="Department" id="nav-dropdown">
                        <div className="dropdown-item">
                            <label>
                                <input type="checkbox" value="AMS" checked={departments.includes("AMS")} onChange={handleDepartmentChange} />
                                AMS
                            </label>
                        </div>
                        <div className="dropdown-item">
                            <label>
                                <input type="checkbox" value="BM" checked={departments.includes("BM")} onChange={handleDepartmentChange} />
                                BM
                            </label>
                        </div>
                        <div className="dropdown-item">
                            <label>
                                <input type="checkbox" value="CSE" checked={departments.includes("CSE")} onChange={handleDepartmentChange} />
                                CSE
                            </label>
                        </div>
                        <div className="dropdown-item">
                            <label>
                                <input type="checkbox" value="ECE" checked={departments.includes("ECE")} onChange={handleDepartmentChange} />
                                ECE
                            </label>
                        </div>
                        <div className="dropdown-item">
                            <label>
                                <input type="checkbox" value="MEC" checked={departments.includes("MEC")} onChange={handleDepartmentChange} />
                                MEC
                            </label>
                        </div>
                        <div className="dropdown-item">
                            <label>
                                <input type="checkbox" value="TSM" checked={departments.includes("TSM")} onChange={handleDepartmentChange} />
                                TSM
                            </label>
                        </div>
                        <div className="dropdown-item">
                            <label>
                                <input type="checkbox" value="FSC" checked={departments.includes("FSC")} onChange={handleDepartmentChange} />
                                FSC
                            </label>
                        </div>
                    </NavDropdown>
                    <NavDropdown title="Semester" id="nav-dropdown">
                        <NavDropdown.Item onClick={() => handleSemesterChange({ target: { value: '24-F' } })}>2024F</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleSemesterChange({ target: { value: '24-S' } })}>2024S</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleSemesterChange({ target: { value: '23-F' } })}>2023F</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleSemesterChange({ target: { value: '23-S' } })}>2023S</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleSemesterChange({ target: { value: '22-F' } })}>2022F</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <h2 className="display-18 display-md-16 display-lg-14 mb-0">Time Table {!fileFound && " Not Updated"} ({departments.join(', ')}) ({year}{semester})</h2>
            </div>
            <div className="row">
                <div className="col-md-15" style={{ marginTop: '1.5%' }}>
                    <div className="schedule-table wide-container">
                        <table className="table bg-white">
                            {/* 윗줄  */}
                            <thead>
                                <tr>
                                    <th style={{ paddingTop: '0.5em' }}><div style={{ width: '5em', height: '2.5em' }}>Time \ Day</div></th>
                                    <th>Mon</th>
                                    <th>Tue</th>
                                    <th>Wed</th>
                                    <th>Thu</th>
                                    <th>Fri</th>
                                    {/* <th className="last">Ect</th> */}
                                </tr>
                            </thead>
                            {/* 바디  */}
                            <tbody>
                                <tr>
                                    {/* Class #1================================================= */}
                                    <td className="day">09:00 - 10:20</td>
                                    {/* Mon1 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="9:00 AM" inputreci="RECM" />
                                    </td>
                                    {/* Tue1*/}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="9:00 AM" inputreci="RECTU" />
                                    </td>
                                    {/* Wed1 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="9:00 AM" inputreci="RECW" />
                                    </td>
                                    {/* Thu1 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="9:00 AM" inputreci="RECTH" />
                                    </td>
                                    {/* Fir1 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="F" inputtime="9:00 AM" inputreci="RECF" />
                                    </td>
                                </tr>
                                <tr>
                                    {/* Class #2================================================= */}
                                    <td className="day">10:30 - 11:50</td>
                                    {/* Mon2 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="10:30 AM" inputreci="RECM" />
                                    </td>
                                    {/* Tue2 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="10:30 AM" inputreci="RECTU" />
                                    </td>
                                    {/* Wed2 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="10:30 AM" inputreci="RECW" />
                                    </td>
                                    {/* Thu2 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="10:30 AM" inputreci="RECTH" />
                                    </td>
                                    {/* Fri2 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="F" inputtime="10:30 AM" inputreci="RECF" />
                                    </td>
                                </tr>
                                <tr>
                                    {/* Class #3================================================= */}
                                    <td className="day">12:30 - 01:50</td>
                                    {/* Mon3  */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="12:30 PM" inputreci="RECM" />
                                    </td>
                                    {/* Tue3 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="12:30 PM" inputreci="RECTU" />
                                    </td>
                                    {/* Wed3 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="12:30 PM" inputreci="RECW" />
                                    </td>
                                    {/* Thu3 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="12:30 PM" inputreci="RECTH" />
                                    </td>
                                    {/* Fri3 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="F" inputtime="12:30 PM" inputreci="RECF" />
                                    </td>
                                </tr>
                                <tr>
                                    {/* Class #4================================================= */}
                                    <td className="day">02:00 - 03:20</td>
                                    {/* Mon 4 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="2:00 PM" inputreci="RECM" />
                                    </td>
                                    {/* Tue 4 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="2:00 PM" inputreci="RECTU" />
                                    </td>
                                    {/* Wed 4 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="2:00 PM" inputreci="RECW" />
                                    </td>
                                    {/* Thu 4 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="2:00 PM" inputreci="RECTH" />
                                    </td>
                                    {/* Fri 4 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="F" inputtime="2:00 PM" inputreci="RECF" />
                                    </td>
                                </tr>
                                <tr>
                                    {/* Class #5================================================= */}
                                    <td className="day">03:30 - 04:50</td>
                                    {/* Mon 5 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="3:30 PM" inputreci="RECM" />
                                    </td>
                                    {/* Tue 5 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="3:30 PM" inputreci="RECTU" />
                                    </td>
                                    {/* Wed 5 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="3:30 PM" inputreci="RECW" />
                                    </td>
                                    {/* Thu 5 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="3:30 PM" inputreci="RECTH" />
                                    </td>
                                    {/* Fri 5 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="F" inputtime="3:30 PM" inputreci="RECF" />
                                    </td>
                                </tr>
                                <tr>
                                    {/* Class #6================================================= */}
                                    <td className="day">05:00 - 06:20</td>
                                    {/* Mon 6 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="5:00 PM" inputreci="RECM" />
                                    </td>
                                    {/* Tue 6 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="5:00 PM" inputreci="RECTU" />
                                    </td>
                                    {/* Wed 6 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="MW" inputtime="5:00 PM" inputreci="RECW" />
                                    </td>
                                    {/* Thu 6 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="TUTH" inputtime="5:00 PM" inputreci="RECTH" />
                                    </td>
                                    {/* Fri 6 */}
                                    <td className="active" style={{ padding: '5px' }}>
                                        <CourseDisplay inputdays="F" inputtime="5:00 PM" inputreci="RECF" />
                                    </td>
                                </tr>
                                <tr>

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
