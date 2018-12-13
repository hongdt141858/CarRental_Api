import CityController from "../controller/CityController";
import AppController from "../controller/global/AppController";
import PartnerController from "../controller/PartnerController";
import VehiclePartController from "../controller/VehiclePartController";

const express = require('express');
const router = express.Router();

let vehiclePartnerController = new VehiclePartController()


router.get('/', vehiclePartnerController.getListVehicles);
router.post('/', vehiclePartnerController.postVehicle)
router.put('/delete-vehicle-partner', vehiclePartnerController.deleteVehicle)
router.put('/edit-vehicle-partner', vehiclePartnerController.editVehicle)
router.get('/get-detail-vehicle-partner', vehiclePartnerController.getDetailVehicleParter);

module.exports = router;