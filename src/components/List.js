import React, { useState, useEffect } from "react";
import "../css/List.css";

export const List = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/courses');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error("There was an error fetching the courses data: ", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div>
            <h2>CRS Values</h2>
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>
                        {course.Subj}
                        {course.CRS}
                        {'-    -'}
                        {course.Days}
                        {'-    -'}
                        {course['Start Time']}
                        {'-    -'}  
                        {course.Instructor}
                        {'-    -'}  
                        {course.Room}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
