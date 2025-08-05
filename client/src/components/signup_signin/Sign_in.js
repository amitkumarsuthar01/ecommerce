import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider';
import { toast } from "react-toastify";

const Sign_in = () => {
    const { setAccount } = useContext(Logincontext);

    const [logdata, setData] = useState({
        email: "",
        password: ""
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        setData((pre) => ({
            ...pre,
            [name]: value
        }));
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;

        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // to send cookies with request
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.status === 400 || !data) {
                toast.error("Invalid Details 👎!");
            } else {
                setAccount(data);
                setData({ email: "", password: "" });
                toast.success("Login Successfully done 😃!");
            }
        } catch (error) {
            console.log("Login error: " + error.message);
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
                        <h1>Sign-In</h1>

                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={adddata}
                                value={logdata.email}
                                id="email"
                            />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={adddata}
                                value={logdata.password}
                                id="password"
                                placeholder="At least 6 characters"
                            />
                        </div>
                        <button
                            type="submit"
                            className="signin_btn"
                            onClick={senddata}
                        >
                            Continue
                        </button>
                    </form>
                </div>
                <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                    <button>
                        <NavLink to="/signup">Create your Amazon Account</NavLink>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Sign_in;
