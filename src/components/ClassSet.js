import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/ClassSet.css";

export const ClassSet = () => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/Profile');
      };

    return (
        
        <div class="container bootstrap snippets bootdey">
            <section id="contact" class="gray-bg padding-top-bottom">
                <div class="container bootstrap snippets bootdey">
                    <div class="row">
                        <form id="Highlighted-form" class="col-sm-6 col-sm-offset-3" action="contact.php" method="post" novalidate="">

                            <h1>Set Classes</h1>

                            <h5>Set classes that should not be in the same timetable</h5>

                            <div class="form-group">
                                <label class="control-label" for="Department">Name</label>
                                <div class="controls">
                                    <input id="Department" name="Department" placeholder="Department" class="form-control requiredField Highlighted-label" data-new-placeholder="Your name" type="text" data-error-empty="Please enter your name"></input>
                                    <i class="fa fa-user"></i>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label" for="contact-mail">Email</label>
                                <div class=" controls">
                                    <input id="contact-mail" name="email" placeholder="Subject" class="form-control requiredField Highlighted-label" data-new-placeholder="Your email" type="email" data-error-empty="Please enter your email" data-error-invalid="Invalid email address"></input>
                                    <i class="fa fa-envelope"></i>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="contact-message">Message</label>
                                <div class="controls">
                                    <textarea id="contact-message" name="comments" placeholder="Class Name - Ex) AMS 161" class="form-control requiredField Highlighted-label" data-new-placeholder="Your message" rows="6" data-error-empty="Please enter your message"></textarea>
                                    <i class="fa fa-comment"></i>
                                </div>
                            </div>
                            <p><button name="submit" type="submit" class="btn btn-info btn-block" onClick={goToProfile} >Set Classes</button></p>
                            <input type="hidden" name="submitted" id="submitted" value="true"></input>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClassSet;
