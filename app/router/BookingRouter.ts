import BookingController from "../controller/BookingController";

const express = require('express');
const router = express.Router();

let bookingController = new BookingController();

router.get("/", bookingController.getAll);
router.get("/get-detail-booking/:code", bookingController.getByCode);
router.post("/", bookingController.postCreate);
router.get("/deli-price", bookingController.getCalculateDeliPrice);
router.get("/detail-price", bookingController.getDetailPrice);
router.get("/promotion", bookingController.getPromotionPrice);
router.get("/get-by-user", bookingController.getBookingsByUserId);
router.get("/get-by-token", bookingController.getBookingsByToken);
router.post("/send-email", bookingController.postSendEmail);
router.post("/edit", bookingController.putEdit);
router.get("/total_price", bookingController.getCalculateDeliPrice)
router.post("/send-requirement", bookingController.postSendRequirement);
module.exports = router;