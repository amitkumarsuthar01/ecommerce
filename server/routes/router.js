const express = require("express");
const router = new express.Router();
const products = require("../models/productsSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate");

// ✅ Get all products
router.get("/getproducts", async (req, res) => {
    try {
        const productsData = await products.find();
        res.status(201).json(productsData);
    } catch (error) {
        console.log("Error getting products:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Register a new user
router.post("/register", async (req, res) => {
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all the details" });
    }

    try {
        const preuser = await User.findOne({ email });

        if (preuser) {
            return res.status(422).json({ error: "This email already exists" });
        }

        if (password !== cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }

        const finaluser = new User({ fname, email, mobile, password, cpassword });
        const storedata = await finaluser.save();

        return res.status(201).json({
            message: "Registration successful",
            user: {
                _id: storedata._id,
                fname: storedata.fname,
                email: storedata.email,
                mobile: storedata.mobile
            }
        });

    } catch (error) {
        console.log("Error during registration:", error.message);
        return res.status(500).json({ error: "Registration failed. Please try again." });
    }
});

// ✅ Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Fill all the details" });
    }

    try {
        const userlogin = await User.findOne({ email });

        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const token = await userlogin.generatAuthtoken();
            console.log("Generated token:", token);

            res.cookie("eccomerce", token, {
                expires: new Date(Date.now() + 2589000),
                httpOnly: true,
                secure: true,
                sameSite: "None"
            });

            res.status(201).json(userlogin);
        } else {
            return res.status(400).json({ error: "User not found" });
        }

    } catch (error) {
        console.log("Login error:", error.message);
        res.status(500).json({ error: "Login failed" });
    }
});

// ✅ Get single product
router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await products.findOne({ id });
        res.status(201).json(product);
    } catch (error) {
        console.log("Error fetching product:", error.message);
        res.status(400).json({ error: "Product not found" });
    }
});

// ✅ Add to cart
router.post("/addcart/:id", authenicate, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await products.findOne({ id });
        const user = await User.findOne({ _id: req.userID });

        if (user) {
            const cartData = await user.addcartdata(product);
            await user.save();
            res.status(201).json(user);
        }
    } catch (error) {
        console.log("Add to cart error:", error.message);
        res.status(500).json({ error: "Add to cart failed" });
    }
});

// ✅ Get cart details
router.get("/cartdetails", authenicate, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userID });
        res.status(201).json(user);
    } catch (error) {
        console.log("Cart details error:", error.message);
        res.status(500).json({ error: "Failed to fetch cart details" });
    }
});

// ✅ Validate user
router.get("/validuser", authenicate, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userID });
        res.status(201).json(user);
    } catch (error) {
        console.log("Valid user error:", error.message);
        res.status(500).json({ error: "Failed to validate user" });
    }
});

// ✅ Logout
router.get("/logout", authenicate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((elem) => elem.token !== req.token);
        res.clearCookie("eccomerce", { path: "/" });
        await req.rootUser.save();
        res.status(201).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Logout error:", error.message);
        res.status(500).json({ error: "Logout failed" });
    }
});

// ✅ Remove item from cart
router.get("/remove/:id", authenicate, async (req, res) => {
    try {
        const { id } = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((item) => item.id != id);
        await req.rootUser.save();
        res.status(201).json(req.rootUser);
    } catch (error) {
        console.log("Remove item error:", error.message);
        res.status(400).json({ error: "Item remove failed" });
    }
});

module.exports = router;
