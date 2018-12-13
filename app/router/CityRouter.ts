import CityController from "../controller/CityController";
import AppController from "../controller/global/AppController";
import PartnerController from "../controller/PartnerController";
import VehiclePartController from "../controller/VehiclePartController";

const express = require('express');
const router = express.Router();

let cityController = new CityController();
let appController = new AppController()
let partenrController = new PartnerController()
let vehiclePartner = new VehiclePartController()


router.get("/", cityController.getAll);
router.get("/a", appController.uploadVehicle);
router.post("/b", appController.uploadPartner);
router.post("/c",appController.uploadVehiclePartner)
router.get("/get-list-short",vehiclePartner.getListVehicles)
module.exports = router;