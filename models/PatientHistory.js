const mongoose = require("mongoose");

const patientHistorySchema =
  new mongoose.Schema(
    {
      patientName: {
        type: String,
        required: true,
      },

      doctorName: {
        type: String,
        required: true,
      },

      disease: {
        type: String,
        required: true,
      },

      medicines: {
        type: String,
        required: true,
      },

      notes: {
        type: String,
      },

      appointmentDate: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "PatientHistory",
    patientHistorySchema
  );