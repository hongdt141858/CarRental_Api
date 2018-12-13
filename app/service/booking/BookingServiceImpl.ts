import IBookingService from "./IBookingService";
import { booking as Booking } from "../../entities/booking"
import BookingRepository from "../../repository/booking/BookingRepository";
import { booking_feedback  as BookingFeedback} from "../../entities/booking_feedback";
import BookFedbakRepository from "../../repository/booking/BookFedbakRepository";
import { booking_price_detail as BookingPriceDetail } from "../../entities/booking_price_detail";
import BookPriceDetailRepository from "../../repository/booking/BookPriceDetailRepository";
import { booking_status as BookingStatus } from "../../entities/booking_status";
import BookStatusRepository from "../../repository/booking/BookStatusRepository";
import BookingReqDTO from "../../dto/booking/BookingReqDTO";
import VehiclePartController from "../../controller/VehiclePartController";
import { partner as Partner } from "../../entities/partner";
import { city as City } from "../../entities/city";
import CityRepository from "../../repository/CityRepository";
import { vehicle as Vehicle } from "../../entities/vehicle";
import { booking_price_type as BookingPriceType } from "../../entities/booking_price_type";
import PromotionRepository from "../../repository/booking/PromotionRepository";
import { promotion as Promotion } from "../../entities/promotion";
import UserAccountRepository from "../../repository/UserAccountRepository";
import { user_account as UserAccount } from "../../entities/user_account";
import ImageRepository from "../../repository/ImageRepository";
import { image as Image } from "../../entities/image";
import VehiclePartnerRepository from "../../repository/VehiclePartRepository";
import { vehicle_partner as VehiclePartner } from "../../entities/vehicle_partner";
import { MyUtil } from "../../util/MyUtil";
import BookPriceTypeRepository from "../../repository/booking/BookPriceTypeRepository";

const distance = require('google-distance');

export default class BookingService implements IBookingService {

    private bookingRepository = new BookingRepository();
    private bookingFedbakRepository = new BookFedbakRepository();
    private bookingPriceDetailRepo = new BookPriceDetailRepository();
    private bookingStatusRepo = new BookStatusRepository();
    private vehiclePartController = new VehiclePartController();
    private cityRepository = new CityRepository();
    private promotionRepository = new PromotionRepository();
    private userRepository = new UserAccountRepository();
    private imageRepository = new ImageRepository();
    private priceTypeRepo = new BookPriceTypeRepository();
    private vehiclePartnerRepository = new VehiclePartnerRepository();

    public async getAll() {
        var result = new Array<Booking>();
        await this.bookingRepository.getAll()
            .then(async books => {
                if (books.length > 0) {
                    for (let i = 0; i < books.length; i++) {
                        await this.getDetailBooking(books[i])
                            .then(b => result.push(b))
                            .catch(err => console.log(err))
                    }
                }
            }).catch(err => {
                throw new Error(err)
            })
        return result;
    }

    public async getOne(id: number) {
        var result: Booking;
        await this.bookingRepository.getOne(id)
            .then(async booking => {
                result = await this.getDetailBooking(booking);
            })
            .catch(err => { throw new Error(err) })
        return result
    }

    public async create(bookReq) {
        if (!bookReq) throw new Error("Request is null")
        var vehicle_partner_id = bookReq.vehicle_partner_id;
        var vehiclePartner = {};

        if (vehicle_partner_id > 0) await this.vehiclePartController.getDetailVehicle(vehicle_partner_id)
            .then(data => vehiclePartner = data)
            .catch(err => console.log(err));

        if (!vehiclePartner) throw new Error("Vehicle partner is not existed!");
        var user_account_id = bookReq.user_account_id;
        var userAccount = new UserAccount();
        if (user_account_id) await this.userRepository.getOne(user_account_id)
            .then(data => userAccount = data)
            .catch(err => console.log(err));
        var booking = new Booking();
        var vehicle = new Vehicle();
        var partner = new Partner();
        vehicle = vehiclePartner["vehicle"];
        partner = vehiclePartner["partner"];
        if (!(vehicle && partner)) throw new Error("Vehicle and Partner is not existed!")
        var booking_rental_date = bookReq.booking_rental_date;
        var booking_return_date = bookReq.booking_return_date;
        if (!(booking_rental_date && booking_return_date)) throw new Error("Rental Date and Return Date is null!!")
        var rentalDate = new Date(booking_rental_date);
        var returnDate = new Date(booking_return_date);
        if ((rentalDate.getTime() < new Date().getTime()) || (returnDate.getTime() < new Date().getTime()) || (returnDate.getTime() < rentalDate.getTime())) throw new Error("rental and return time is not invalid")

        // create booking
        if (userAccount) booking.user_account_id = userAccount.user_account_id;
        booking.customer_name = bookReq.customer_name;
        booking.customer_email = bookReq.customer_email;
        booking.customer_phone = bookReq.customer_phone;
        booking.customer_delivery_address = bookReq.customer_delivery_address;
        booking.customer_delivery_lat = bookReq.customer_delivery_lat;
        booking.customer_delivery_long = bookReq.customer_delivery_long;
        booking.partner_id = partner.partner_id;
        booking.partner_name = partner.partner_name;
        booking.city_id = partner.city_id;
        booking.city_name = partner.city_name;
        console.log("rentalDate - returnDate" + rentalDate + " - " + returnDate)
        booking.booking_rental_date = rentalDate;
        booking.booking_return_date = returnDate;
        booking.booking_note = bookReq.booking_note;

        booking.vehicle_partner_id = vehiclePartner["vehicle_partner_id"];
        booking.vehicle_partner_name = vehiclePartner["vehicle_partner_name"];
        booking.booking_status_id = 1;
        booking.booking_day_number = this.getDayNum(rentalDate, returnDate, partner);
        booking.booking_extra_hour = this.getExtaHourNum(rentalDate, returnDate, partner)
        booking.booking_weekday_number = this.getWdayNum(rentalDate, returnDate, partner)
        booking.booking_holiday_number = this.getHoliNum(rentalDate, returnDate, partner)
        booking.booking_delivery_form_id = bookReq.booking_delivery_form_id;
        booking.promotion_value = await this.calculatePromoPrice(bookReq);
        booking.promotion_code = booking.promotion_value !== 0 ? bookReq.promotion_code: "";
        booking.booking_price_total = 0;
        booking.booking_date_create = bookReq.booking_date_create == "" ? new Date() : new Date(bookReq.booking_date_create);
        if(bookReq.booking_id != "")
            booking.booking_id = parseInt(bookReq.booking_id)
        await this.bookingRepository.create(booking)
            .then(result => {
                booking = result
            })
            .catch(err => {
                throw new Error(err)
            })

        if (!booking) throw new Error("Don't create a new booking");

        if (bookReq.booking_code== "")
            booking.booking_code = await this.createBookingCode(booking);
        else
            booking.booking_code = bookReq.booking_code

        await this.bookingRepository.update(booking.booking_id, booking)
            .catch(err => { throw new Error(err) })

        // create detail price

        await this.calculateDetailPrice(booking, vehiclePartner)
            .then(async result => {
                await this.saveDetailPrice(result.booking_price_details)
                    .catch(err => console.log(err))
                booking.booking_price_total = result.price_total;
            })
            .catch(err => console.log(err));

        await this.bookingRepository.update(booking.booking_id, booking)
            .catch(err => { throw new Error(err) })

        var newBooking: Booking
        await this.getByCode(booking.booking_code)
            .then(res => newBooking = res)
            .catch(err => { throw new Error(err) })
        console.log(newBooking)
        return newBooking
    }

    public async getByCode(code: string) {
        var booking = new Booking();
        await this.bookingRepository.findByCode(code)
            .then(data => booking = data[0])
            .catch(err => console.log(err))
        var detailBooking = await this.getDetailBooking(booking);
        return detailBooking;
    }

    public async calculateDeliPrice(bookingReq:Booking): Promise<object> {
        if (!bookingReq) throw new Error("Data is not be empty!");
        var vehicle_partner_id = bookingReq.vehicle_partner_id;
        var vehiclePartner = null;
        await this.vehiclePartController.getDetailVehicle(vehicle_partner_id)
            .then(result => vehiclePartner = result)
            .catch(err => console.log(err))
        if (!vehiclePartner) throw new Error("Vehicle's partner is not existed!");
        var partner = new Partner()
        partner = vehiclePartner["partner"];
        if (!partner) throw new Error("Partner is null!");

        var deli_part = bookingReq.customer_delivery_address;
        var customer_delivery_lat = bookingReq.customer_delivery_lat;
        var customer_delivery_long = bookingReq.customer_delivery_long;
        let distance;
        let result = {
            price: 0,
            distance: 0
        }

        if (customer_delivery_lat && customer_delivery_long) {
            var destination = customer_delivery_lat + ',' + customer_delivery_long;
            var partner_lat = partner.partner_lat;
            var partner_long = partner.partner_long;

            var origin = partner_lat + ',' + partner_long;

            await this.getDistanceMatrix(origin, destination)
                .then(value => {
                    distance = value
                })
                .catch(err => { throw new Error(err) })

        }
        else if (deli_part) {
            var destination = deli_part;
            var origin = partner.partner_address
            await this.getDistanceMatrix(origin, destination)
                .then(value => distance = value)
                .catch(err => { throw new Error(err) })
        } else throw new Error("Customer's address is not null!");

        if (!distance) throw new Error("Not get distance object");
        var distanceValue = Math.ceil(distance["distanceValue"] / 1000);
        var overDistance = distanceValue;
        if (partner.partner_delivery_free_km > 0) {
            overDistance = distanceValue - partner.partner_delivery_free_km;
            if (overDistance < 0) overDistance = 0;
        }
        result.distance = distanceValue;
        result.price = partner.partner_delivery_over_km_fee * overDistance
        return result;
    }

    public async calculatePromoPrice(bookingReq:any): Promise<any> {
        if (!bookingReq) throw new Error("Request is null");
        if (!bookingReq.getPromoCode()) return 0;
        var code = bookingReq.getPromoCode();
        code = code.toLowerCase();
        console.log("code: ", code)
        var promotion = new Promotion();
        await this.promotionRepository.getByCode(code)
            .then(result => promotion = result)
            .catch(err => console.log(err))
        if (!promotion || (promotion.promotion_code !== code)) throw new Error("Mã giảm giá không tồn tại");

        var vehiclePartner = new VehiclePartner();
        await this.vehiclePartnerRepository.getOne(bookingReq.getvehiclePartnerId())
            .then(data => vehiclePartner = data)
            .catch(err => console.log(err))

        if (promotion.partner_id) {
            if (!vehiclePartner || (vehiclePartner.partner_id !== promotion.partner_id)) throw new Error("Mã giảm giá không được áp dụng trong trường hợp này")
        }

        if (promotion.vehicle_id) {
            if (!vehiclePartner || (vehiclePartner.vehicle_id !== promotion.vehicle_id)) throw new Error("Mã giảm giá không được áp dụng trong trường hợp này")
        }

        if (promotion.vehicle_partner_id) {
            if (!vehiclePartner || (vehiclePartner.vehicle_partner_id !== promotion.vehicle_partner_id)) throw new Error("Mã giảm giá không được áp dụng trong trường hợp này")
        }

        var result = 0;
        var rentalDate = new Date(bookingReq.getBookRentDate());
        var returnDate = new Date(bookingReq.getBookRetunDate());
        var promoActive = promotion.promotion_active.getTime();
        var promoExpire = promotion.promotion_expire.getTime();

        if ((rentalDate.getTime() > promoActive) && (returnDate.getTime() < promoExpire) && (returnDate.getTime() > rentalDate.getTime())) {
            var arrDates = MyUtil.getDays(rentalDate, returnDate);
            if (arrDates && arrDates.length > 0) {
                for (let i = 0; i < arrDates.length; i++) {
                    if (arrDates[i].getDay() === 0 || arrDates[i].getDay() === 6)
                        throw new Error("Mã khuyến mãi không áp dụng cho ngày cuối tuần")
                }
            }
            result = promotion.promotion_value
        } else throw new Error("Mã khuyến mãi đã hết hạn!")
        return result
    }

    public async getDetailPrice(bookingReq): Promise<any> {
        if (!bookingReq) throw new Error("Request is null")
        var vehicle_partner_id = bookingReq.vehicle_partner_id;
        var vehiclePartner;

        if (vehicle_partner_id > 0) await this.vehiclePartController.getDetailVehicle(vehicle_partner_id)
            .then(data => vehiclePartner = data)
            .catch(err => console.log(err));

        if (!vehiclePartner) throw new Error("Vehicle partner is not existed!");
        var booking = new Booking();
        var vehicle = new Vehicle();
        var partner = new Partner();
        vehicle = vehiclePartner["vehicle"];
        partner = vehiclePartner["partner"];
        if (!(vehicle && partner)) throw new Error("Vehicle and Partner is not existed!")
        var booking_rental_date = bookingReq.booking_rental_date;
        var booking_return_date = bookingReq.booking_return_date;
        if (!(booking_rental_date && booking_return_date)) throw new Error("Rental Date and Return Date is null!!")
        var rentalDate = new Date(booking_rental_date);
        var returnDate = new Date(booking_return_date);
        if ((rentalDate.getTime() < new Date().getTime()) || (returnDate.getTime() < new Date().getTime()) || (returnDate.getTime() < rentalDate.getTime())) throw new Error("rental and return time is not invalid")

        booking.vehicle_partner_id = vehiclePartner["vehicle_partner_id"];
        booking.vehicle_partner_name = vehiclePartner["vehicle_partner_name"];
        booking.booking_rental_date = rentalDate;
        booking.booking_return_date = returnDate;
        booking.customer_delivery_address = bookingReq.customer_delivery_address;
        booking.customer_delivery_lat = bookingReq.customer_delivery_lat;
        booking.customer_delivery_long = bookingReq.customer_delivery_long;
        booking.booking_day_number = this.getDayNum(rentalDate, returnDate, partner);
        booking.booking_extra_hour = this.getExtaHourNum(rentalDate, returnDate, partner)
        booking.booking_weekday_number = this.getWdayNum(rentalDate, returnDate, partner)
        booking.booking_holiday_number = this.getHoliNum(rentalDate, returnDate, partner)
        booking.booking_delivery_form_id = bookingReq.booking_delivery_form_id;
        booking.promotion_code = bookingReq.promotion_code;

        var result = null;
        await this.calculateDetailPrice(booking, vehiclePartner)
            .then(data => result = data)
            .catch(err => console.log(err))
        if (!result) throw new Error("Error API")
        return result;
    }

    async calculateDetailPrice(booking, vehiclePartner) {
        if (!booking || !vehiclePartner) throw new Error("Data is not be null!");
        var defaPrice = vehiclePartner["vehicle_partner_default_price"] || 0
        var priceTypes = new Array<BookingPriceType>();
        var bookPriceDetails = new Array<BookingPriceDetail>();
        var priceTotal = 0;
        var bookReq = new Booking();

        await this.priceTypeRepo.getAll()
            .then(result => priceTypes = result)
            .catch(err => { throw new Error(err) })

        if (priceTypes && priceTypes.length > 0) {
            for (let i = 0; i < priceTypes.length; i++) {
                var dtlPrice = new BookingPriceDetail();
                dtlPrice.booking_id = booking.booking_id;
                dtlPrice.booking_price_type_id = priceTypes[i].booking_price_type_id;

                switch (priceTypes[i].booking_price_type_code) {
                    case "DAY_PRICE": {
                        dtlPrice.booking_price_quantity = booking.booking_day_number;
                        dtlPrice.unit_price = defaPrice;
                        dtlPrice.detail_price_total = dtlPrice.unit_price * dtlPrice.booking_price_quantity;
                        await this.getBookPriceDetail(dtlPrice)
                            .then(result => bookPriceDetails.push(result))
                            .catch(err => console.log(err))
                        priceTotal += dtlPrice.detail_price_total;
                        break;
                    }
                    case "WDAY_PRICE": {
                        var wdayExtraFee = this.getWdayExtraFee(vehiclePartner);

                        dtlPrice.detail_price_total = booking.booking_weekday_number;
                        dtlPrice.unit_price = wdayExtraFee;
                        dtlPrice.detail_price_total = dtlPrice.booking_price_quantity * dtlPrice.unit_price;
                        await this.getBookPriceDetail(dtlPrice)
                            .then(result => bookPriceDetails.push(result))
                            .catch(err => console.log(err))
                        priceTotal += dtlPrice.detail_price_total;
                        break;
                    }
                    case "HOLI_PRICE": {
                        var holiExtraFee = this.getHoliExtraFee(vehiclePartner);

                        dtlPrice.booking_price_quantity = booking.booking_holiday_number;
                        dtlPrice.unit_price = holiExtraFee;
                        dtlPrice.detail_price_total = dtlPrice.booking_price_quantity * dtlPrice.unit_price;
                        await this.getBookPriceDetail(dtlPrice)
                            .then(result => bookPriceDetails.push(result))
                            .catch(err => console.log(err))
                        priceTotal += dtlPrice.detail_price_total;
                        break;
                    }
                    case "DELI_PRICE": {
                        var deli = null;
                        if (bookReq.customer_delivery_address || (bookReq.customer_delivery_lat && bookReq.customer_delivery_long)) {
                            await this.calculateDeliPrice(bookReq)
                                .then(result => deli = result)
                                .catch(err => console.log(err))
                        }
                        dtlPrice.booking_price_quantity = booking.booking_delivery_form_id;
                        dtlPrice.unit_price = deli ? deli["price"] : 0;
                        dtlPrice.detail_price_total = dtlPrice.booking_price_quantity * dtlPrice.unit_price;
                        await this.getBookPriceDetail(dtlPrice)
                            .then(result => bookPriceDetails.push(result))
                            .catch(err => console.log(err))
                        priceTotal += dtlPrice.detail_price_total;
                        break;
                    }
                    case "DAYPACK_PRICE": {
                        dtlPrice.booking_price_quantity = 0;
                        dtlPrice.unit_price = 0;
                        dtlPrice.detail_price_total = dtlPrice.booking_price_quantity * dtlPrice.unit_price;
                        await this.getBookPriceDetail(dtlPrice)
                            .then(result => bookPriceDetails.push(result))
                            .catch(err => console.log(err))
                        priceTotal += dtlPrice.detail_price_total;
                        break;
                    }
                    case "promotion_PRICE": {
                        var promotion = 0;
                        if (bookReq.promotion_code)
                            await this.calculatePromoPrice(bookReq)
                                .then(result => promotion = result)
                                .catch(err => console.log(err));
                        if (MyUtil.isPercent(promotion)) promotion = (promotion / 100) * defaPrice
                        dtlPrice.booking_price_quantity = booking.booking_day_number;
                        dtlPrice.unit_price = promotion
                        dtlPrice.detail_price_total = dtlPrice.booking_price_quantity * dtlPrice.unit_price;
                        await this.getBookPriceDetail(dtlPrice)
                            .then(result => bookPriceDetails.push(result))
                            .catch(err => console.log(err))
                        priceTotal -= dtlPrice.detail_price_total
                        break;
                    }
                }
            }
        }
        console.log("bookPriceDetails", bookPriceDetails);
        console.log("priceTotal", priceTotal);

        return {
            booking_price_details: bookPriceDetails,
            price_total: priceTotal
        }

    }

    public async getBookingsByUserId(user_account_id: number) {
        if ((user_account_id <= 0) || (!user_account_id)) throw new Error("User's id not null");
        var user = null;
        await this.userRepository.getOne(user_account_id)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("User is not existed!");
        var bookings = [];
        await this.bookingRepository.findByUserId(user.user_account_id)
            .then(data => bookings = data)
            .catch(err => console.log(err))
        return bookings;
    }

    public async getBookingsByToken(token: string) {
        if (!token) throw new Error("User's token not null");
        var user = null;
        await this.userRepository.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("User is not existed!");
        var bookings = new Array<Booking>();
        await this.bookingRepository.findByUserId(user.user_account_id)
            .then(data => bookings = data)
            .catch(err => console.log(err));
        var result = new Array<Booking>();
        if (bookings && (bookings.length > 0)) {
            for (let booking of bookings) {
                var detailBooking = await this.getDetailBooking(booking);
                if (detailBooking) result.push(detailBooking)
                else console.log("Error get detail booking")
            }
        }

        return result;
    }

    getDistanceMatrix = (origin, destination) => new Promise((resolve, reject) => {
        // distance.apiKey = 'AIzaSyALSIOWSz6C9xByjYNfSo20LVKrCAyatiw';
        distance.sensor = false
        console.log(origin)
        console.log(destination)
        distance.get(
            {
                index: 1,
                origin: origin,
                destination: destination
            }, (err, response) => {
                if (err) {
                    console.log(err);
                    reject(response);
                }
                else {
                    console.log(response);
                    resolve(response)
                }

            })
    });



    getDetailBooking = async (booking: Booking) => {
        var result = booking;
        console.log(result);

        var bookFedbak = new Array<BookingFeedback>();
        await this.bookingFedbakRepository.findByBookingId(result.booking_id)
            .then(feedbacks => bookFedbak = feedbacks)
            .catch(err => console.log(err))
        result["booking_feedback"] = bookFedbak;

        var bookPrices = new Array<BookingPriceDetail>();
        await this.bookingPriceDetailRepo.findByBookingId(result.booking_id)
            .then(result => bookPrices = result);
        var bookPriceDetails = new Array<BookingPriceDetail>();
        if (bookPrices && bookPrices.length > 0) {
            for (let i = 0; i < bookPrices.length; i++) {
                await this.getBookPriceDetail(bookPrices[i])
                    .then(priceDetail => bookPriceDetails.push(priceDetail))
                    .catch(err => console.log(err))
            }
        }
        result["booking_price_detail"] = bookPriceDetails

        var bookStatus = new BookingStatus();
        await this.bookingStatusRepo.getById(result.booking_status_id)
            .then(status => bookStatus = status)
            .catch(err => console.log(err))
        result["booking_status"]= bookStatus;


        var vehiclePartner = new VehiclePartner();
        await this.vehiclePartnerRepository.getOne(result.vehicle_partner_id)
            .then(data => vehiclePartner = data)
            .catch(err => console.log(err))
        if (!vehiclePartner) throw new Error("Not found partner's vehicle");

        var vehicleImages = new Array<Image>();
        await this.imageRepository.findByImageTable("vehicle", vehiclePartner.vehicle_id)
            .then(data => vehicleImages = data)
            .catch(err => console.log(err))

        result["vehicle_images"]= vehicleImages

        return result;
    }

    getBookPriceDetail = async (bookPriceDetail) => {

        var bookPriceDetailDTO =bookPriceDetail;
        if (bookPriceDetailDTO) {
            await this.priceTypeRepo.findById((bookPriceDetailDTO.booking_price_type_id))
                .then(result => {
                    bookPriceDetailDTO["booking_price_type"] = result;
                })
                .catch(err => console.log(err))
        }
        return bookPriceDetailDTO
    }

    getDayNum = (rentalDate: Date, returnDate: Date, partner): number => {
        var rtlDate = rentalDate;
        var rtnDate = returnDate;
        var rtl = new Date(MyUtil.getDateFormatEn(rtlDate));
        var rtn = new Date(MyUtil.getDateFormatEn(rtnDate));
        if (!rtl || !rtn || !partner) return 0
        var rtlTime = rtl.getTime();
        var rtnTime = rtn.getTime();
        if (rtnTime < rtlTime) return 0
        var dayNum = (rtnTime - rtlTime) / (24 * 1000 * 3600) + 1;
        return dayNum ? dayNum : 0
    }

    getWdayNum = (rentalDate: Date, returnDate: Date, partner): number => {
        if (!rentalDate || !returnDate || !partner) return 0
        var wdays = MyUtil.getWdays(rentalDate, returnDate, partner);
        var holis = MyUtil.getHolis(rentalDate, returnDate, partner);
        var holiIsWday = MyUtil.getDayNumHoliIsWday(wdays, holis);
        var wdayNum = wdays.length - holiIsWday;
        return wdayNum > 0 ? wdayNum : 0

    }

    getHoliNum = (rentalDate, returnDate, partner): number => {
        var rentalDate = rentalDate;
        var returnDate = returnDate;
        if (!rentalDate || !returnDate || !partner) return 0;
        var holis = MyUtil.getHolis(rentalDate, returnDate, partner);
        return holis ? holis.length : 0
    }

    getExtaHourNum = (rentalDate, returnDate, partner): number => {
        if (!rentalDate || !returnDate || !partner) return 0
        return 0
    }

    getWdayExtraFee = (vehicle) => {
        if (!vehicle) return 0;
        var price = 0;
        if (vehicle.partner.partner_weekdays[0]) {
            var fee = vehicle.partner.partner_weekdays[0].partner_extra_fee;
            if (MyUtil.isPercent(fee)) {
                price = vehicle.vehicle_partner_default_price * fee / 100;
            } else {
                price = fee;
            }
        }
        return price
    }

    getHoliExtraFee = (vehicle) => {
        if (!vehicle) return 0;
        var price = 0;
        if (vehicle.partner.partner_holidays[0]) {
            var fee = vehicle.partner.partner_holidays[0].partner_extra_fee;
            if (MyUtil.isPercent(fee)) {
                price += vehicle.vehicle_partner_default_price * fee / 100
            } else price += fee
        }
        return price
    }

    getSumPrice = (detailPrices: Array<BookingPriceDetail>): number => {
        var sum = 0
        if (detailPrices && detailPrices.length > 0) {
            for (let i = 0; i < detailPrices.length; i++) {
                sum += detailPrices[i].detail_price_total
            }
        }
        return sum
    }

    createBookingCode = async (booking: Booking): Promise<string> => {
        var city = new City();
        city = await this.cityRepository.getOne(booking.city_id);
        if (!city) return "";

        var rentalDate = booking.booking_rental_date;

        var { day, month } = MyUtil.getMonthDay(rentalDate);
        var dateStr = rentalDate.getFullYear().toString().substr(-2) + month
        var booking_id = booking.booking_id;
        booking_id = (booking_id > 10000) ? booking_id : (10000 + booking_id)
        var bookCode =  dateStr + booking_id
        return bookCode ? bookCode : ""

    }

    saveDetailPrice = async (dtlPrice: BookingPriceDetail[]): Promise<BookingPriceDetail[]> => {
        var result = new Array<BookingPriceDetail>();
        if (dtlPrice && dtlPrice.length > 0) {
            for (let i = 0; i < dtlPrice.length; i++) {
                var price = new BookingPriceDetail();
                price.booking_id = dtlPrice[i].booking_id;
                price.booking_price_detail_id = dtlPrice[i].booking_price_detail_id;
                price.booking_price_type_id = dtlPrice[i].booking_price_type_id;
                price.detail_price_total = dtlPrice[i].detail_price_total;
                price.booking_price_quantity = dtlPrice[i].booking_price_quantity;
                price.unit_price = dtlPrice[i].unit_price;
                await this.bookingPriceDetailRepo.create(price)
                    .then(data => result.push(data))
                    .catch(err => { throw new Error(err) })
            }
        }
        return result;
    }

}