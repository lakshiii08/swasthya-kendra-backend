const express = require("express");

const router = express.Router();

const Doctor =
  require("../models/Doctor");


// GET ALL DOCTORS

router.get(
  "/",
  async (req, res) => {

    try {

      const doctors =
        await Doctor.find();

      res.json(doctors);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch doctors",
      });
    }
  }
);


// GET SINGLE DOCTOR

router.get(
  "/:id",
  async (req, res) => {

    try {

      const doctor =
        await Doctor.findById(
          req.params.id
        );

      if (!doctor) {

        return res
          .status(404)
          .json({
            message:
              "Doctor not found",
          });
      }

      res.json(doctor);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch doctor",
      });
    }
  }
);


// CREATE DOCTOR

router.post(
  "/",
  async (req, res) => {

    try {

      const {
        name,
        specialty,
        experience,
        fee,
      } = req.body;

      const doctor =
        await Doctor.create({
          name,
          specialty,
          experience,
          fee,
        });

      res.status(201).json({
        success: true,
        doctor,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to create doctor",
      });
    }
  }
);


// UPDATE DOCTOR

router.put(
  "/:id",
  async (req, res) => {

    try {

      const {
        name,
        specialty,
        experience,
        fee,
      } = req.body;

      const updatedDoctor =
        await Doctor.findByIdAndUpdate(
          req.params.id,
          {
            name,
            specialty,
            experience,
            fee,
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        doctor: updatedDoctor,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update doctor",
      });
    }
  }
);


// DELETE DOCTOR

router.delete(
  "/:id",
  async (req, res) => {

    try {

      await Doctor.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Doctor deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to delete doctor",
      });
    }
  }
);

module.exports = router;