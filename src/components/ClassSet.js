import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import conflictformat from '../images/conflict.png';

import "../css/ClassSet.css";

export const ClassSet = () => {

    const [courses, setCourses] = useState([]);
    const [fileFound, setFileFound] = useState(false);
    const [fileUpload, setFileUpload] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/Profile');
    };
    const goToAdmin = () => {
        navigate('/AdminTable');
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to upload file');
            const result = await response.json();
            setCourses(result.data)
            setFileUpload(true)
            console.log(result.message); // Process the response message as needed
            console.log(result.data)
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (

        <div class="container bootstrap snippets bootdey">
            <section id="contact" class="gray-bg padding-top-bottom">
                <div class="container bootstrap snippets bootdey">
                    <div class="row">
                        <form id="Highlighted-form" class="col-sm-6 col-sm-offset-3" action="contact.php" method="post" novalidate="">

                            <h1>Set Classes</h1>

                            <h5>Set classes that should not be in the same timetable</h5>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h5>The format should be as shown below.</h5>
                                <div>
                                    <Nav>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                                <button name="submit" type="submit" class="btn btn-info btn-block"> Input CSV </button>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                    />
                                </div>
                            </div>

                            <img src={conflictformat} style={{ paddingBottom: '1em', height: "60vh" }} />
                            <button class="btn btn-info btn-block" style={{ width: "30em" }} onClick={goToAdmin}>Back to table</button>
                            <input type="hidden" name="submitted" id="submitted" value="true"></input>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClassSet;
