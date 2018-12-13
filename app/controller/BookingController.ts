import { Request, Response, NextFunction } from "express";
import BookingServiceImpl from "../service/booking/BookingServiceImpl";
import IBookingService from "../service/booking/IBookingService";;
import BookingReqDTO from "../dto/booking/BookingReqDTO";
import BookPriceDetailService from '../service/booking/BookPriceDetailService'
import { MyUtil } from "../util/MyUtil";
import { Utils } from "../util/Validate";
import { booking } from "../entities/booking";

var email = require("../config/email")

export default class BookingController {
    private bookingService: IBookingService;
    private bookPriceDetailService: BookPriceDetailService;

    constructor() {
        this.bookingService = new BookingServiceImpl();
        this.bookPriceDetailService = new BookPriceDetailService();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all bookings ==> GET");
        await this.bookingService.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };

    public getByCode = async (req: Request, res: Response) => {
        console.log("get a booking by code ==> GET");

        var code = req.params.code;
        if (!code) MyUtil.handleError({ message: "No data!" }, res);

        await this.bookingService.getByCode(code)
            .then(data => {
                console.log(data)
                MyUtil.handleSuccess(data, res)
            })
            .catch(err => MyUtil.handleError(err, res))
    }

    public putEdit = async (req: Request, res: Response) => {
        console.log("edit a new booking ==> POST");

        if (!req.body) {
            MyUtil.handleError({ message: "No data!" }, res);
        }
        // console.log(req.body)
        var bookReq =  req.body;

        if (!Utils.isEmailAddress(bookReq.customer_email)) MyUtil.handleError({ message: "Email is not true!" }, res);
        if (!Utils.isPhoneNumber(bookReq.customer_phone)) MyUtil.handleError({ message: "Phone number is not true!" }, res);
        if (bookReq.vehicle_partner_id <= 0 && bookReq.vehicle_partner_name === "") MyUtil.handleError({ message: "Vehicle info is wrong!" }, res);

        var book_id = parseInt(bookReq.booking_id + "");
        await this.bookPriceDetailService.deleteByBookId(book_id)
        await this.bookingService.create(bookReq)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))

    }


    public postCreate = async (req: Request, res: Response) => {
        console.log("create a new booking ==> POST");

        if (!req.body) {
            MyUtil.handleError({ message: "No data!" }, res);
        }
        // console.log(req.body)
        var bookReq =req.body;

        if (!Utils.isEmailAddress(bookReq.customer_email)) MyUtil.handleError({ message: "Email is not true!" }, res);
        if (!Utils.isPhoneNumber(bookReq.customer_phone)) MyUtil.handleError({ message: "Phone number is not true!" }, res);
        if (bookReq.vehicle_partner_id <= 0 && bookReq.vehicle_partner_name === "") MyUtil.handleError({ message: "Vehicle info is wrong!" }, res);

        // console.log(bookReq)
        await this.bookingService.create(bookReq)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))

    }

    public getCalculateDeliPrice = async (req: Request, res: Response) => {
        console.log("get delivery price for booking");

        if (!req.query) {
            MyUtil.handleError({ message: "No data!" }, res);
        }
        console.log(req.query)
        var bookReq = new req.query;
        console.log(bookReq)
        if (!bookReq || bookReq.vehicle_partner_id < 0 || !((bookReq.customer_delivery_lat && bookReq.customer_delivery_long) || bookReq.customer_delivery_address)) MyUtil.handleError({ message: "Data is not enough!!" }, res);

        await this.bookingService.calculateDeliPrice(bookReq)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public getDetailPrice = async (req: Request, res: Response) => {
        console.log("get detail price for booking");
        if (!req.query) {
            MyUtil.handleError({ message: "No data!" }, res);
        }
        console.log(req.query)
        var bookReq = new booking();
        console.log(bookReq);
        if (!bookReq || bookReq.vehicle_partner_id < 0 || !bookReq.booking_rental_date || !bookReq.booking_return_date) MyUtil.handleError({ message: "Data is not enough!!" }, res);

        await this.bookingService.getDetailPrice(bookReq)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public getPromotionPrice = async (req: Request, res: Response) => {
        console.log("get promotion by promotion code");
        if (!req.query) MyUtil.handleError({ message: "No data!" }, res);
        console.log("query: ", req.query);
        var bookReq = req.query;
        if (!bookReq || !bookReq.getBookRentDate() || !bookReq.getBookRetunDate() || !bookReq.getPromoCode()) MyUtil.handleError({ message: "Data is not enough!!" }, res);

        await this.bookingService.calculatePromoPrice(bookReq)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))

    }

    public getBookingsByUserId = async (req: Request, res: Response) => {
        console.log("get all bookings of user by user_acc_id");
        if (!req.query) MyUtil.handleError({ message: "User's id is not be empty!" }, res);
        var user_acc_id = req.query.user_acc_id;
        if (!user_acc_id || (user_acc_id <= 0)) MyUtil.handleError({ message: "User's id is not be empty!" }, res);

        await this.bookingService.getBookingsByUserId(user_acc_id)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public getBookingsByToken = async (req: Request, res: Response) => {
        console.log("get all bookings of user by user_acc_tokn");
        if (!req.query) MyUtil.handleError({ message: "User's id is not be empty!" }, res);
        var token = req.headers.authorization;
        if (!token) MyUtil.handleError({ message: "User's token is not be empty!" }, res);

        await this.bookingService.getBookingsByToken(token)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public postSendEmail = async (req: Request, res: Response) => {
        console.log("send email => POST");
        if (!req.body) MyUtil.handleError({ message: "Email body is not empty!" }, res);
        if (!req.body.cstm_emai) MyUtil.handleError({ message: "Receiver's email is not empty!" }, res);
        if (!req.body.subject) MyUtil.handleError({ message: "Subject is not empty!" }, res);
        if (!req.body.content) MyUtil.handleError({ message: "Content is not empty!" }, res);
        var options = {
            receiver: req.body.cstm_emai,
            subject: req.body.subject,
            content: req.body.content,
        }
        await email.sendMail(options)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    public postSendRequirement = async (req: Request, res: Response) => {
        console.log("send requirement special=> POST");
        if (!req.body) MyUtil.handleError({ message: "Body is not empty!" }, res);
        if (!req.body.email) MyUtil.handleError({ message: "Email body is not empty!" }, res);
        if (!req.body.subject) MyUtil.handleError({ message: "Subject is not empty!" }, res);
        if (!req.body.content) MyUtil.handleError({ message: "Content is not empty!" }, res);
        var options = {
            receiver: req.body.email,
            subject: req.body.subject,
            content: req.body.content,
        }
        await email.sendMail(options)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))
    }

}