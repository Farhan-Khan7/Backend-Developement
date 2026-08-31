const express = require("express");
const crypto = require("crypto");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).json({
      message: "User Already Exist With This Email",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );


  res.cookie("token", token);

  res.status(201).json({
    message: "User Register Successfully!",
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decode.id);

  res.status(200).json({
    message: "User find Successfully!",
    user: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const registeredUser = await userModel.findOne({ email });

  if (!registeredUser) {
    return res.status(404).json({
      message: "User not Found!",
    });
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  console.log(hashPassword);

  const isPassword = hashPassword === registeredUser.password;

  if (!isPassword) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: registeredUser._id,
    },
    process.env.JWT_SECRET,{ expiresIn: "1h" }
  );


  res.cookie("token", token);

  res.status(200).json({
    message: "User LoggedIn Successfully!",
    user: {
      name: registeredUser.name,
      email: registeredUser.email,
    },
  });
});

module.exports = authRouter;
