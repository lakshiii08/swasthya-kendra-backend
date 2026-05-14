const express = require("express");

const router =
  express.Router();

const {
  getHistory,
  createHistory,
  deleteHistory,
} = require(
  "../controllers/patientHistoryController"
);

router.get(
  "/",
  getHistory
);

router.post(
  "/",
  createHistory
);

router.delete(
  "/:id",
  deleteHistory
);

module.exports = router;