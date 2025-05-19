const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters long" });
    }
    const user = await User.findOne({ where: { username: username } });
    if (user) return res.status(400).json({ message: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters long" });
    }
    const user = await user.findOne({
      where: { username: username },
    });

    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.userId },
      process.env.JWT_SECRET || "jwt-secret",
      {
        expiresIn: "1d",
      }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user.userId,
          username: user.username,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};


const Logout = async (req, res) =>{
    res
    .clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    })
    .status(200)
    .json({ message: "Logout successful" });
}

module.exports = {
    Register,
    Login,
    Logout,
}