import React from "react";
import google from "../images/google-logo.svg"
import MainImage from '../images/timetable.png';
import sbulogo from '../images/sbu.jpg';
import "../css/MainPage.css";
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const navigate = useNavigate();

  const goToTT1 = () => {
    navigate('/TimeTable1');
  };

  const goToLogin = () => {
    navigate('/Login');
  };

  return (
    <div className="main-page">
      <div className="group">

        <img src={sbulogo} className="sbulogo" />

        <div className="text-wrapper">SUNY Course Scheduling</div>

        <div>
          <img src={MainImage} className="main-image" style={{ marginTop: "130px" }} />
        </div>

        <button className="timetable-button" onClick={goToTT1}>
          <div className="table-button-text">Show Time Table </div>
        </button>

        <button className="login-button" onClick={goToLogin}>
          <div className="button-text">Google Sign in</div>
          <img className="element-logo-google" alt="Element logo google" src={google} />
        </button>

      </div>
    </div>
  );
};

export default MainPage;
