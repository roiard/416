import React from "react";
import google from "../images/google-logo.svg"
import MainImage from '../images/si.jpg';
import "../css/MainPage.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const MainPage = () => {
    const navigate = useNavigate();

    const goToPref = () => {
      navigate('/Preference');
    };

    const goToCal = () => {
      navigate('/Calendar');
    };

  return (
    <div className="main-page">
      <div className="group">
        
        <div className="text-wrapper">Easy Course Schedulings</div>
        <button onClick={goToCal} >new button!</button>
        <img src={MainImage} className="main-image"/>

        <button className="button"onClick={goToPref}>
          <div className="div">Google Sign in</div>
          <img className="element-logo-google" alt="Element logo google" src={google} />
        </button>
        
        {/* <button className="button"onClick={goToCal}>
          <div className="div">Go To Cal</div>
          <img className="element-logo-google" alt="Element logo google" src={google} />
        </button> */}

      </div>
    </div>
  );
};

export default MainPage;
