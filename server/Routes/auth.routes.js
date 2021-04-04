const router = require(`express`).Router();
const { user_model } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/all-users", async (req, res) => {
  try {
    const users = await user_model.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});


router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      birthdate,
      phonenumber,
      profile_photo,
      password,
      confirm_password,
    } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);
      if (password != confirm_password)
    return res.status(500).send({ error: "Password must be matched." });
    const registed_user = await user_model.create({
      username,
      email,
      birthdate,
      phonenumber,
      profile_photo,
      password:hashedPass,
    });
    res.json({ "Succefully has registered to Tweeter.": registed_user });
  } catch (error) {
    console.log(error)
    if ((error.code = 11000))
    return res.send({ error: "Username/Email already taken." });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const invalidMessage = {
      msg: "Invalid Email/Password",
    };

    const user = await user_model.findOne({ email });
    if (!user) return res.status(500).json({invalidMessage});

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(500).json({invalidMessage});

    const access_token = jwt.sign(
      {
        email: user.email,
        username: user.username,
        birthdate: user.birthdate,
        phonenumber: user.phonenumber,
        profile_photo: user.profile_photo,
        role: user.role,
      },
      `${process.env.ACCESS_TOKEN}`,
      {
        expiresIn: "300s",
      }
    );

    return res.json({ msg: `Welcome ${user.username}`, access_token });
  } catch (error) {
    console.log({ error });
  }
});

module.exports = router;
