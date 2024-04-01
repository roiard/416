import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../css/Profile.css";

export const Profile = () => {
    const navigate = useNavigate();
    const goToTT1 = () => {
        navigate('/TimeTable1');
      };
    return (
        <div class="container mt-5">
            <div class="row">
                <div class="col-lg-4 pb-5">
                    <div class="author-card pb-3">
                        <div class="author-card-cover" style={{backgroundColor:'lightgrey'}} ></div>
                        <div class="author-card-profile">
                            <div class="author-card-avatar"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Daniel Adams"></img>
                            </div>
                            <div class="author-card-details">
                                <h5 class="author-card-name text-lg">CS Admin</h5><span class="author-card-position">Joined February 06, 2017</span>
                            </div>
                        </div>
                    </div>
                    <div class="wizard">
                        <nav class="list-group list-group-flush">
                            <a class="list-group-item active" href="#"><i class="fe-icon-user text-muted"></i>Profile Settings</a>
                            {/* <a class="list-group-item" href="#"><i class="fe-icon-map-pin text-muted"></i>Addresses</a> */}
                            {/* <a class="list-group-item" href="https://www.bootdey.com/snippets/view/bs4-wishlist-profile-page" target="__blank">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div><i class="fe-icon-heart mr-1 text-muted"></i>
                                        <div class="d-inline-block font-weight-medium text-uppercase">My Wishlist</div>
                                    </div><span class="badge badge-secondary">3</span>
                                </div>
                            </a> */}
                            {/* <a class="list-group-item" href="https://www.bootdey.com/snippets/view/bs4-account-tickets" target="__blank">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div><i class="fe-icon-tag mr-1 text-muted"></i>
                                        <div class="d-inline-block font-weight-medium text-uppercase">My Tickets</div>
                                    </div><span class="badge badge-secondary">4</span>
                                </div>
                            </a> */}
                        </nav>
                    </div>
                </div>

                <div class="col-lg-8 pb-5">
                    <form class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="account-fn">First Name</label>
                                <input class="form-control" type="text" id="account-fn" placeholder="First Name" required=""></input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="account-ln">Last Name</label>
                                <input class="form-control" type="text" id="account-ln" placeholder="Last Name" required=""></input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="account-email">E-mail Address</label>
                                <input class="form-control" type="email" id="account-email" placeholder="cs.professor@sbu.com" disabled=""></input>
                            </div>
                        </div>
                        {/* <div class="col-md-6">
                            <div class="form-group">
                                <label for="account-phone">Department</label>
                                <input class="form-control" type="text" id="account-phone" placeholder="+7 (805) 348 95 72" required=""></input>
                            </div>
                        </div> */}
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="account-pass">New Password</label>
                                <input class="form-control" type="password" id="account-pass"></input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="account-confirm-pass">Confirm Password</label>
                                <input class="form-control" type="password" id="account-confirm-pass"></input>
                            </div>
                        </div>
                        <div class="col-12">
                            <hr class="mt-2 mb-3"></hr>
                                <div class="d-flex flex-wrap justify-content-between align-items-center">
                                    <div class="custom-control custom-checkbox d-block">
                                        <input class="custom-control-input" type="checkbox" id="subscribe_me" checked=""></input>
                                            <label class="custom-control-label" for="subscribe_me">Remember Me</label>
                                    </div>
                                    {/* <button class="btn btn-style-1 btn-primary" type="button" data-toast="" data-toast-position="topRight" data-toast-type="success" data-toast-icon="fe-icon-check-circle" data-toast-title="Success!" data-toast-message="Your profile updated successfuly.">Login</button> */}
                                    <button class="btn btn-style-1 btn-primary" type="button" onClick={goToTT1}>Login</button>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
