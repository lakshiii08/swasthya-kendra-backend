const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone,
    } = req.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    res.status(201).json({
      success: true,

      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await user.matchPassword(password))
    ) {

      res.json({
        success: true,

        token: generateToken(user._id),

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });

    } else {

      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  signup,
  login,
};