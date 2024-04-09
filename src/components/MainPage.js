import React from "react";
import google from "../images/google-logo.svg"
import MainImage from '../images/timetable.png';
import sbulogo from '../images/sbu.jpg';
import "../css/MainPage.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const MainPage = () => {
    const navigate = useNavigate();

    const goToList = () => {
      navigate('//127.0.0.1:5000/courses');
    };
    // http://127.0.0.1:5000/courses

    const goToPref = () => {
      navigate('/Preference');
    };

    const goToCal = () => {
      navigate('/Calendar');
    };

    const goToTT1 = () => {
      navigate('/TimeTable1');
    };

    const goToTT2 = () => {
      navigate('/TimeTable2');
    };

    const goToLogin = () => {
      navigate('/Login');
    };

    const goToProfile = () => {
      navigate('/Profile');
    };

  return (
    <div className="main-page">
      <div className="group">

        <img src={sbulogo} className="sbulogo"/>
        
        <div className="text-wrapper">SUNY Course Scheduling</div>

        <img src={MainImage} className="main-image"/>

        <button className="timetable-button" onClick={goToTT1}>
          <div className="table-button-text">Make Time Table</div>
        </button>

        {/* <button className="timetable-button" onClick={goToList}>
          <div className="table-button-text">Make Time Tablelistlistlistlist</div>
        </button> */}

        <button className="login-button" onClick={goToLogin}>
          <div className="button-text">Google Sign in</div>
          <img className="element-logo-google" alt="Element logo google" src={google} />
        </button>

      </div>
    </div>
  );
};

export default MainPage;
