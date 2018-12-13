import CityController from "../controller/CityController";
import AppController from "../controller/global/AppController";
import PartnerController from "../controller/PartnerController";

const express = require('express');
const router = express.Router();

let cityController = new CityController();
let appController = new AppController()
let partenrController = new PartnerController()


router.get("/", cityController.getAll);
router.get("/a", appController.uploadVehicle);
router.post("/b", appController.uploadPartner);
router.post("/c",appController.uploadVehiclePartner)
module.exports = router;