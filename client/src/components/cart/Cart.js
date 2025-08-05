import React, { useContext, useEffect, useState } from 'react';
import "./cart.css";
import { Divider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';
import { Logincontext } from "../context/Contextprovider";

const Cart = () => {
    const { account, setAccount } = useContext(Logincontext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [inddata, setIndedata] = useState(null);

    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    // Fetch product details
    const getinddata = async () => {
        try {
            const res = await fetch(`${BASE_URL}/getproductsone/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if (res.status !== 201 || !data) {
                console.error("No product data available");
            } else {
                setIndedata(data);
            }
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => getinddata(), 1000);
        return () => clearTimeout(timeout);
    }, [id]);

    // Add item to cart
    const addtocart = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/addcart/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inddata }),
                credentials: "include"
            });

            const data = await res.json();

            if (res.status !== 201 || !data) {
                console.error("Error adding to cart");
            } else {
                setAccount(data);
                navigate("/buynow");
            }
        } catch (error) {
            console.error("Add to cart error:", error);
        }
    };

    return (
        <div className="cart_section">
            {inddata && Object.keys(inddata).length > 0 ? (
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={inddata.detailUrl} alt="cart" />
                        <div className="cart_btn">
                            <button className="cart_btn1" onClick={() => addtocart(inddata.id)}>Add to Cart</button>
                            <button className="cart_btn2">Buy Now</button>
                        </div>
                    </div>

                    <div className="right_cart">
                        <h3>{inddata.title.shortTitle}</h3>
                        <h4>{inddata.title.longTitle}</h4>
                        <Divider />
                        <p className="mrp">M.R.P. : <del>₹{inddata.price.mrp}</del></p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}> ₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount}) </span></p>

                        <div className="discount_box">
                            <h5>Discount : <span style={{ color: "#111" }}>{inddata.discount}</span></h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}>Tomorrow 11AM</span></p>
                        </div>

                        <p className="description">About the Item: <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{inddata.description}</span></p>
                    </div>
                </div>
            ) : (
                <div className="circle">
                    <CircularProgress />
                    <h2>Loading....</h2>
                </div>
            )}
        </div>
    );
};

export default Cart;
