import React, { useContext } from 'react';
import { Logincontext } from '../context/Contextprovider';
import { toast } from "react-toastify";

const Option = ({ deletedata, get }) => {
    const { account, setAccount } = useContext(Logincontext);

    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const removedata = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/remove/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if (res.status === 400 || !data) {
                console.log("Error occurred while removing item.");
                toast.error("Failed to remove item.");
            } else {
                setAccount(data);
                get(); // Refresh the cart
                toast.success("Item removed from cart 😃!");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="add_remove_select" key={deletedata}>
            <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p onClick={() => removedata(deletedata)} style={{ cursor: "pointer" }}>Delete</p><span>|</span>
            <p className="forremovemedia">Save Or Later</p><span>|</span>
            <p className="forremovemedia">See More like this</p>
        </div>
    );
};

export default Option;
