const express = require("express");

const {
  createAppointment,
  getAppointments,
} = require("../controllers/appointmentController");

const Appointment =
  require("../models/Appointment");

const router = express.Router();


// CREATE APPOINTMENT

router.post(
  "/",
  createAppointment
);


// GET APPOINTMENTS

router.get(
  "/",
  getAppointments
);


// CANCEL APPOINTMENT

router.delete(
  "/:id",
  async (req, res) => {

    try {

      await Appointment.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Appointment cancelled",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Cancel failed",
      });
    }
  }
);

module.exports = router;