import React, { useContext, useEffect, useState } from "react";
import "../header/navbaar.css";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import { Logincontext } from "../context/Contextprovider";
import LogoutIcon from "@mui/icons-material/Logout";
import { makeStyles } from "@mui/styles";
import { Drawer, IconButton, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Rightheader from "./Rightheader";
import { getProducts } from "../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const usestyle = makeStyles({
  component: {
    marginTop: 10,
    marginRight: "-50px",
    width: "300px",
    padding: 50,
    height: "300px",
  },
});

const Navbaar = () => {
  const classes = usestyle();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(null);
  const [liopen, setLiopen] = useState(true);
  const [dropen, setDropen] = useState(false);
  const { account, setAccount } = useContext(Logincontext);
  const { products } = useSelector((state) => state.getproductsdata);
  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    getdetailsvaliduser();
  }, []);

  const getdetailsvaliduser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/validuser`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();

      if (res.status === 201) {
        setAccount(data);
      }
    } catch (err) {
      console.error("Error in getdetailsvaliduser:", err.message);
    }
  };

  const logoutuser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/logout`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 201) {
        setAccount(false);
        setOpen(null);
        toast.success("User Logout 😃!");
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout Error:", err.message);
      toast.error("Server error during logout");
    }
  };

  const handelopen = () => setDropen(true);
  const handleClosedr = () => setDropen(false);
  const handleClick = (event) => setOpen(event.currentTarget);
  const handleClose = () => setOpen(null);
  const getText = (text) => {
    setText(text);
    setLiopen(false);
  };

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handelopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handleClosedr}>
            <Rightheader userlog={logoutuser} logclose={handleClosedr} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="logo" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              onChange={(e) => getText(e.target.value)}
              placeholder="Search Your Products"
            />
            <div className="search_icon">
              <i className="fas fa-search" id="search"></i>
            </div>
            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem key={product.id}>
                      <NavLink
                        to={`/getproductsone/${product.id}`}
                        onClick={() => setLiopen(true)}
                      >
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>

        <div className="right">
          <div className="nav_btn">
            {account ? (
              <button onClick={logoutuser}> Sign out </button>
            ) : (
              <NavLink to="/login">Sign in</NavLink>
            )}
          </div>

          <NavLink to={account ? "/buynow" : "/login"}>
            <div className="cart_btn">
              <Badge
                badgeContent={account ? account.carts.length : 0}
                color="secondary"
              >
                <i className="fas fa-shopping-cart" id="icon"></i>
              </Badge>
              <p>Cart</p>
            </div>
          </NavLink>

          <Avatar
            className={account ? "avtar2" : "avtar"}
            onClick={handleClick}
            title={account ? account.fname.toUpperCase() : ""}
          >
            {account ? account.fname[0].toUpperCase() : ""}
          </Avatar>

          <div className="menu_div">
            <Menu
              anchorEl={open}
              open={Boolean(open)}
              onClose={handleClose}
              className={classes.component}
            >
              <MenuItem onClick={handleClose} style={{ margin: 10 }}>
                My account
              </MenuItem>
              {account && (
                <MenuItem onClick={logoutuser} style={{ margin: 10 }}>
                  <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
                </MenuItem>
              )}
            </Menu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbaar;
