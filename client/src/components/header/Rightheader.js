import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider';
import "./rightheader.css";
import { Divider, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from "react-toastify";

const Rightheader = ({ logclose }) => {
    const imgd = "/india.png";
    const { account, setAccount } = useContext(Logincontext);
    const navigate = useNavigate();

    const logoutuser = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            if (res.status === 201) {
                setAccount(false);
                toast.success("Logged out successfully!");
                logclose(); // close drawer
                navigate("/");
            } else {
                toast.error("Logout failed!");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <Box className="rightheader">
            <Box className="right_nav">
                {
                    account ?
                        <Avatar className="avtar2" title={account.fname.toUpperCase()}>
                            {account.fname[0].toUpperCase()}
                        </Avatar> :
                        <Avatar className="avtar" />
                }
                {account && <h3>Hello, {account.fname.toUpperCase()}</h3>}
            </Box>

            <Box
                className="nav_btn"
                onClick={() => logclose()}
                sx={{
                    marginTop: 1,
                    marginRight: "-50px",
                    width: 300,
                    padding: 5,
                    height: 300
                }}
            >
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">Shop By Category</NavLink>
                <Divider sx={{ width: "100%", ml: -2 }} />
                <NavLink to="/" style={{ marginTop: 10 }}>Today's Deal</NavLink>
                {
                    account
                        ? <NavLink to="/buynow">Your Order</NavLink>
                        : <NavLink to="/login">Your Order</NavLink>
                }
                <Divider sx={{ width: "100%", ml: -2 }} />

                <Box className="flag" sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <NavLink to="">Settings</NavLink>
                    <img src={imgd} alt="india flag" style={{ width: 35, marginLeft: 10 }} />
                </Box>

                {
                    account ? (
                        <Box className="flag" sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <LogoutIcon sx={{ fontSize: 18, mr: 1 }} />
                            <h3 onClick={logoutuser} style={{ cursor: "pointer", fontWeight: 500 }}>
                                Log Out
                            </h3>
                        </Box>
                    ) : (
                        <NavLink to="/login">Sign in</NavLink>
                    )
                }
            </Box>
        </Box>
    );
};

export default Rightheader;
