import CityController from "../controller/CityController";
const express = require('express');
const router = express.Router();

let cityController = new CityController();

router.get("/", cityController.getAll);

module.exports = router;