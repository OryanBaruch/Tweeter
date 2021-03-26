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

// router.get('/decode', async (req, res)=>{
//     try {
//         jwt.decode
//     } catch (error) {
//         console.log('the error is:',error)
//     }
// })

router.post("/register", async (req, res) => {
  const {
    username,
    email,
    birthdate,
    phonenumber,
    profile_photo,
    password: hashedPass,
    confirm_password,
  } = req.body;
  const password = await bcrypt.hash(hashedPass, 10);
  if (hashedPass != confirm_password)
    return res.status(500).send({ error: "Password must be matched." });
  try {
    if (
      !username ||
      !birthdate ||
      !profile_photo ||
      !password ||
      !confirm_password
    )
      return res.status(500).json({ error: "Must fill all fields." });
    const registed_user = await user_model.create({
      username,
      email,
      birthdate,
      phonenumber,
      profile_photo,
      password,
      confirm_password,
    });
    res.json({ "Succefully has registered to Tweeter.": registed_user });
  } catch (error) {
    if ((error.code = 11000))
      return res.send({ error: "Username/Email already taken." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const invalidMessage = {
      status: "Error",
      msg: "Invalid Data",
    };

    const user = await user_model.findOne({ email });
    if (!user) return res.status(500).json(invalidMessage);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(500).json(invalidMessage);

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
    const refresh_token = jwt.sign(
      {
        id: user.id,
      },
      `${process.env.REFRESH_TOKEN}`,
      {
        expiresIn: "1y",
      }
    );
    return res.json({ msg: `Welcome ${user.username}`, access_token, refresh_token,
    });
  } catch (error) {
    console.log({ error });
  }
});

module.exports = router;
