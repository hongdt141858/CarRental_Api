import CityController from "../controller/CityController";
import AppController from "../controller/global/AppController";

const express = require('express');
const router = express.Router();

let cityController = new CityController();
let appController = new AppController()

router.get("/", cityController.getAll);
router.get("/a", appController.uploadVehicle);

module.exports = router;