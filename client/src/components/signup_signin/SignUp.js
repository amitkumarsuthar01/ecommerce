import { Divider } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import "./signup.css";

const Signup = () => {

    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        setUdata((pre) => ({
            ...pre,
            [name]: value
        }));
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { fname, email, mobile, password, cpassword } = udata;

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ fname, email, mobile, password, cpassword })
            });

            const text = await res.text();
            const data = text ? JSON.parse(text) : {};

            if (res.status === 422 || !data) {
                toast.error(data?.error || "Invalid Details 👎!");
            } else {
                setUdata({
                    fname: "", email: "", mobile: "", password: "", cpassword: ""
                });
                toast.success("Registration Successfully done 😃!");
            }
        } catch (error) {
            console.log("Signup error: " + error.message);
            toast.error("Server error. Try again later!");
        }
    };

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Create account</h1>
                        <div className="form_data">
                            <label htmlFor="name">Your name</label>
                            <input
                                type="text"
                                name="fname"
                                onChange={adddata}
                                value={udata.fname}
                                id="name"
                            />
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={adddata}
                                value={udata.email}
                                id="email"
                            />
                        </div>
                        <div className="form_data">
                            <label htmlFor="mobile">Mobile number</label>
                            <input
                                type="number"
                                name="mobile"
                                onChange={adddata}
                                value={udata.mobile}
                                id="mobile"
                            />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={adddata}
                                value={udata.password}
                                id="password"
                                placeholder="At least 6 characters"
                            />
                        </div>
                        <div className="form_data">
                            <label htmlFor="passwordg">Password again</label>
                            <input
                                type="password"
                                name="cpassword"
                                onChange={adddata}
                                value={udata.cpassword}
                                id="passwordg"
                            />
                        </div>
                        <button
                            type="submit"
                            className="signin_btn"
                            onClick={senddata}
                        >
                            Continue
                        </button>

                        <Divider />

                        <div className="signin_info">
                            <p>Already have an account?</p>
                            <NavLink to="/login">Sign in</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Signup;
