const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));



const url = "mongodb+srv://prajuladkat:admin@cluster0.5jwr2yw.mongodb.net/?retryWrites=true&w=majority"
const port = 8000;

const connectDb = () => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("MongoDB Connected"))
}


app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    }, "test", { expiresIn: "1h" });

    // send token and user to frontend
    res.status(200).json({ user, token });

}
)

app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDb();
})
