const Appointment = require("../models/Appointment");

const createAppointment = async (req, res) => {

  try {

    const {
      doctorName,
      specialty,
      date,
      time,
    } = req.body;

    const appointment = await Appointment.create({
      doctorName,
      specialty,
      date,
      time,
    });

    res.status(201).json({
      success: true,
      appointment,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAppointments = async (req, res) => {

  try {

    const appointments =
      await Appointment.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      appointments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};