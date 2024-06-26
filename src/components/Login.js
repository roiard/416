import React from "react";
import { useNavigate } from 'react-router-dom';
import "../css/Login.css";

export const Login = () => {
    const navigate = useNavigate();

    const goToProfile = async (event) => {
        event.preventDefault();
        const email = document.getElementById('exampleInputEmail1').value;
        const password = document.getElementById('exampleInputPassword1').value;

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                navigate('/AdminTable');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Failed to fetch', error);
            alert('Failed to connect. Please check your connection and try again.');
        }
    };


    return (
        <div id="main-wrapper" className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div className="card border-0">
                        <div className="card-body p-0">
                            <div className="row no-gutters">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="mb-5">
                                            <h3 className="h4 font-weight-bold text-theme">Login</h3>
                                        </div>

                                        <h6 className="h5 mb-0">Welcome!</h6>
                                        <p className="text-muted mt-2 mb-5">Enter your email address and password to access admin panel.</p>

                                        <form onSubmit={goToProfile}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1"></input>
                                            </div>
                                            <div className="form-group mb-5">
                                                <label htmlFor="exampleInputPassword1">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1"></input>
                                            </div>
                                            <button type="submit" className="btn btn-theme">Login</button>
                                        </form>
                                    </div>
                                </div>

                                <div className="col-lg-6 d-none d-lg-inline-block">
                                    <div className="account-block rounded-right">
                                        <div className="overlay rounded-right"></div>
                                        <div className="account-testimonial">
                                            <h4 className="text-white mb-4">This Page is for Coordinators</h4>
                                            <p className="lead text-white">"Students can view the uploaded schedule at the main page"</p>
                                            <p>- Admin User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
