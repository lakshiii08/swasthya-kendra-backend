const express = require("express");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTER

router.post(
  "/register",
  async (req, res) => {

    try {

      console.log(
        "REGISTER BODY:",
        req.body
      );

      const {
        name,
        email,
        password,
        role,
      } = req.body;

      // VALIDATION

      if (
        !name ||
        !email ||
        !password
      ) {

        return res
          .status(400)
          .json({
            message:
              "Please fill all fields",
          });
      }

      // CHECK EXISTING USER

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });
      }

      // CREATE USER

      const user =
        await User.create({
          name,
          email,
          password,

          role:
            role ||
            "patient",
        });

      // TOKEN

      const token =
        jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          process.env
            .JWT_SECRET ||
            "secret123"
        );

      res.status(201).json({
        success: true,
        message:
          "Registration successful",
        token,
        user,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Register Error",
      });
    }
  }
);


// LOGIN

router.post(
  "/login",
  async (req, res) => {

    try {

      console.log(
        "LOGIN BODY:",
        req.body
      );

      const {
        email,
        password,
      } = req.body;

      // VALIDATION

      if (
        !email ||
        !password
      ) {

        return res
          .status(400)
          .json({
            message:
              "Please fill all fields",
          });
      }

      // FIND USER

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res
          .status(400)
          .json({
            message:
              "User not found",
          });
      }

      // PASSWORD CHECK

      if (
        password !==
        user.password
      ) {

        return res
          .status(400)
          .json({
            message:
              "Invalid password",
          });
      }

      // TOKEN

      const token =
        jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          process.env
            .JWT_SECRET ||
            "secret123"
        );

      res.status(200).json({
        success: true,
        message:
          "Login successful",
        token,
        user,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Login Error",
      });
    }
  }
);

module.exports = router;