// import IBookingService from "./IBookingService";
// import { booking as Booking } from "../../entities/booking"
// import BookingRepository from "../../repository/booking/BookingRepository";
// import { booking_feedback  as BookingFeedback} from "../../entities/booking_feedback";
// import BookFedbakRepository from "../../repository/booking/BookFedbakRepository";
// import { booking_price_detail as BookingPriceDetail } from "../../entities/booking_price_detail";
// import BookPriceDetailRepository from "../../repository/booking/BookPriceDetailRepository";
// import { booking_status as BookingStatus } from "../../entities/booking_status";
// import BookStatusRepository from "../../repository/booking/BookStatusRepository";
// import BookingReqDTO from "../../dto/booking/BookingReqDTO";
// import VehiclePartController from "../../controller/VehiclePartController";
// import { partner as Partner } from "../../entities/partner";
// import { city as City } from "../../entities/city";
// import CityRepository from "../../repository/CityRepository";
// import { vehicle as Vehicle } from "../../entities/vehicle";
// import { booking_price_type as BookingPriceType } from "../../entities/booking_price_type";
// import PromotionRepository from "../../repository/booking/PromotionRepository";
// import { promotion } from "../../entities/promotion";
// import UserAccountRepository from "../../repository/user/UserAccountRepository";
// import { cx_user_acc } from "../../entities/user/cx_user_acc";
// import ImageVehicleRepository from "../../repository/vehicle/image/ImageVehicleRepository";
// import { cx_vhc_img } from "../../entities/vehicle/cx_vhc_img";
// import VehiclePartRepository from "../../repository/partner/VehiclePartRepository";
// import { cx_vhc_part } from "../../entities/partner/cx_vhc_part";

// const distance = require('google-distance');

// export default class BookingService implements IBookingService {

//     private bookingRepository = new BookingRepository();
//     private bookingFedbakRepository = new BookFedbakRepository();
//     private bookingPriceDetailRepo = new BookPriceDetailRepository();
//     private bookingStatusRepo = new BookStatusRepository();
//     private vehiclePartController = new VehiclePartController();
//     private cityRepository = new CityRepository();
//     private typeRepository = new TypeVehicleRepository();
//     private priceTypeRepo = new BookPriceTypeRepository();
//     private payMethodRepo = new PayMethodRepository();
//     private PromotionRepository = new PromotionRepository();
//     private userRepository = new UserAccountRepository();
//     private imageRepository = new ImageVehicleRepository();
//     private vhcPartRepository = new VehiclePartRepository();

//     public async getAll() {
//         var result = new Array<BookingResDTO>();
//         await this.bookingRepository.getAll()
//             .then(async books => {
//                 if (books.length > 0) {
//                     for (let i = 0; i < books.length; i++) {
//                         await this.getDetailBooking(books[i])
//                             .then(b => result.push(b))
//                             .catch(err => console.log(err))
//                     }
//                 }
//             }).catch(err => {
//                 throw new Error(err)
//             })
//         return result;
//     }

//     public async getOne(id: number) {
//         var result: BookingResDTO;
//         await this.bookingRepository.getOne(id)
//             .then(async booking => {
//                 result = await this.getDetailBooking(booking);
//             })
//             .catch(err => { throw new Error(err) })
//         return result
//     }

//     public async create(bookReq: BookingReqDTO) {
//         if (!bookReq) throw new Error("Request is null")
//         var vhc_part_id = bookReq.getVhcPartId();
//         var vehiclePartner = {};

//         if (vhc_part_id > 0) await this.vehiclePartController.getDetailVehicle(vhc_part_id)
//             .then(data => vehiclePartner = data)
//             .catch(err => console.log(err));

//         if (!vehiclePartner) throw new Error("Vehicle partner is not existed!");
//         var user_acc_id = bookReq.getUseAccId();
//         var userAccount = new cx_user_acc();
//         if (user_acc_id) await this.userRepository.getOne(user_acc_id)
//             .then(data => userAccount = data)
//             .catch(err => console.log(err));
//         var booking = new Booking();
//         var vehicle = new cx_vhc();
//         var partner = new cx_part();
//         vehicle = vehiclePartner["vhc"];
//         partner = vehiclePartner["part"];
//         if (!(vehicle && partner)) throw new Error("Vehicle and Partner is not existed!")
//         var rentalDateStr = bookReq.getBookRentDate();
//         var returnDateStr = bookReq.getBookRetunDate();
//         if (!(rentalDateStr && returnDateStr)) throw new Error("Rental Date and Return Date is null!!")
//         var rentalDate = new Date(rentalDateStr);
//         var returnDate = new Date(returnDateStr);
//         if ((rentalDate.getTime() < new Date().getTime()) || (returnDate.getTime() < new Date().getTime()) || (returnDate.getTime() < rentalDate.getTime())) throw new Error("rental and return time is not invalid")

//         // create booking
//         if (userAccount) booking.use_acc_id = userAccount.user_acc_id;
//         booking.cstm_name = bookReq.getCstmName();
//         booking.cstm_emai = bookReq.getCstmEmai();
//         booking.cstm_phon = bookReq.getCstmPhon();
//         booking.cstm_deli_addr = bookReq.getCstmDeliAddr();
//         booking.cstm_deli_addr_lat = bookReq.getCstmDeliAddrLat();
//         booking.cstm_deli_addr_lng = bookReq.getCstmDeliAddrLng();
//         booking.cstm_pay_meth_id = bookReq.getCstmPayMethId();
//         booking.part_id = partner.part_id;
//         booking.part_name = partner.part_name;
//         booking.city_id = partner.city_id;
//         booking.city_name = partner.city_name;
//         booking.vhc_type_id = vehicle.vhc_type_id;
//         booking.vhc_type_name = vehicle.vhc_type_name
//         console.log("rentalDate - returnDate" + rentalDate + " - " + returnDate)
//         booking.book_rent_date = rentalDate;
//         booking.book_retun_date = returnDate;
//         booking.book_note = bookReq.getBookNote();

//         booking.vhc_part_id = vehiclePartner["vhc_part_id"];
//         booking.vhc_part_name = vehiclePartner["vhc_part_name"];
//         booking.book_stt_id = 1;
//         booking.book_day_num = this.getDayNum(rentalDate, returnDate, partner);
//         booking.book_exta_hour_num = this.getExtaHourNum(rentalDate, returnDate, partner)
//         booking.book_wday_num = this.getWdayNum(rentalDate, returnDate, partner)
//         booking.book_holi_num = this.getHoliNum(rentalDate, returnDate, partner)
//         booking.book_deli_form_id = bookReq.getBookDeliFormId();
//         booking.promo_val = await this.calculatePromoPrice(bookReq);
//         booking.promo_code = booking.promo_val !== 0 ? bookReq.getPromoCode() : "";
//         booking.book_prie_tota = 0;
//         booking.book_crta = bookReq.getBookCrta() == "" ? new Date() : new Date(bookReq.getBookCrta());
//         if(bookReq.getBookId() != "")
//             booking.book_id = parseInt(bookReq.getBookId())
//         await this.bookingRepository.create(booking)
//             .then(result => {
//                 booking = result
//             })
//             .catch(err => {
//                 throw new Error(err)
//             })

//         if (!booking) throw new Error("Don't create a new booking");

//         if (bookReq.getBookCode() == "")
//             booking.book_code = await this.createBookingCode(booking);
//         else
//             booking.book_code = bookReq.getBookCode()

//         await this.bookingRepository.update(booking.book_id, booking)
//             .catch(err => { throw new Error(err) })

//         // create detail price

//         await this.calculateDetailPrice(booking, vehiclePartner)
//             .then(async result => {
//                 await this.saveDetailPrice(result.booking_price_details)
//                     .catch(err => console.log(err))
//                 booking.book_prie_tota = result.price_total;
//             })
//             .catch(err => console.log(err));

//         await this.bookingRepository.update(booking.book_id, booking)
//             .catch(err => { throw new Error(err) })

//         var newBooking: BookingResDTO
//         await this.getByCode(booking.book_code)
//             .then(res => newBooking = res)
//             .catch(err => { throw new Error(err) })
//         console.log(newBooking)
//         return newBooking
//     }

//     public async getByCode(code: string) {
//         var booking = new cx_book();
//         await this.bookingRepository.findByCode(code)
//             .then(data => booking = data[0])
//             .catch(err => console.log(err))
//         var detailBooking = await this.getDetailBooking(booking);
//         return detailBooking;
//     }

//     public async calculateDeliPrice(bookingReq: BookingReqDTO): Promise<object> {
//         if (!bookingReq) throw new Error("Data is not be empty!");
//         var vhc_part_id = bookingReq.getVhcPartId();
//         var vhcPart = null;
//         await this.vehiclePartController.getDetailVehicle(vhc_part_id)
//             .then(result => vhcPart = result)
//             .catch(err => console.log(err))
//         if (!vhcPart) throw new Error("Vehicle's partner is not existed!");
//         var partner = new cx_part()
//         partner = vhcPart["part"];
//         if (!partner) throw new Error("Partner is null!");

//         var deli_part = bookingReq.getCstmDeliAddr();
//         var deli_addr_lat = bookingReq.getCstmDeliAddrLat();
//         var deli_addr_lng = bookingReq.getCstmDeliAddrLng();
//         let distance;
//         let result = {
//             price: 0,
//             distance: 0
//         }

//         if (deli_addr_lat && deli_addr_lng) {
//             var destination = deli_addr_lat + ',' + deli_addr_lng;
//             var part_addr_lat = partner.part_lat;
//             var part_addr_lng = partner.part_lng;

//             var origin = part_addr_lat + ',' + part_addr_lng;

//             await this.getDistanceMatrix(origin, destination)
//                 .then(value => {
//                     distance = value
//                 })
//                 .catch(err => { throw new Error(err) })

//         }
//         else if (deli_part) {
//             var destination = deli_part;
//             var origin = partner.part_addr
//             await this.getDistanceMatrix(origin, destination)
//                 .then(value => distance = value)
//                 .catch(err => { throw new Error(err) })
//         } else throw new Error("Customer's address is not null!");

//         if (!distance) throw new Error("Not get distance object");
//         var distanceValue = Math.ceil(distance["distanceValue"] / 1000);
//         var overDistance = distanceValue;
//         if (partner.part_deli_free_km > 0) {
//             overDistance = distanceValue - partner.part_deli_free_km;
//             if (overDistance < 0) overDistance = 0;
//         }
//         result.distance = distanceValue;
//         result.price = partner.part_deli_over_km_fee * overDistance
//         return result;
//     }

//     public async calculatePromoPrice(bookingReq: BookingReqDTO): Promise<any> {
//         if (!bookingReq) throw new Error("Request is null");
//         if (!bookingReq.getPromoCode()) return 0;
//         var code = bookingReq.getPromoCode();
//         code = code.toLowerCase();
//         console.log("code: ", code)
//         var promo = new cx_promo();
//         await this.PromotionRepository.getByCode(code)
//             .then(result => promo = result)
//             .catch(err => console.log(err))
//         if (!promo || (promo.promo_code !== code)) throw new Error("Mã giảm giá không tồn tại");

//         var vhcPart = new cx_vhc_part();
//         await this.vhcPartRepository.getOne(bookingReq.getVhcPartId())
//             .then(data => vhcPart = data)
//             .catch(err => console.log(err))

//         if (promo.part_id) {
//             if (!vhcPart || (vhcPart.part_id !== promo.part_id)) throw new Error("Mã giảm giá không được áp dụng trong trường hợp này")
//         }

//         if (promo.vhc_id) {
//             if (!vhcPart || (vhcPart.vhc_id !== promo.vhc_id)) throw new Error("Mã giảm giá không được áp dụng trong trường hợp này")
//         }

//         if (promo.vhc_part_id) {
//             if (!vhcPart || (vhcPart.vhc_part_id !== promo.vhc_part_id)) throw new Error("Mã giảm giá không được áp dụng trong trường hợp này")
//         }

//         var result = 0;
//         var rentalDate = new Date(bookingReq.getBookRentDate());
//         var returnDate = new Date(bookingReq.getBookRetunDate());
//         var promoActive = promo.promo_active.getTime();
//         var promoExpire = promo.promo_expire.getTime();

//         if ((rentalDate.getTime() > promoActive) && (returnDate.getTime() < promoExpire) && (returnDate.getTime() > rentalDate.getTime())) {
//             var arrDates = MyUtil.getDays(rentalDate, returnDate);
//             if (arrDates && arrDates.length > 0) {
//                 for (let i = 0; i < arrDates.length; i++) {
//                     if (arrDates[i].getDay() === 0 || arrDates[i].getDay() === 6)
//                         throw new Error("Mã khuyến mãi không áp dụng cho ngày cuối tuần")
//                 }
//             }
//             result = promo.promo_val
//         } else throw new Error("Mã khuyến mãi đã hết hạn!")
//         return result
//     }

//     public async getDetailPrice(bookingReq: BookingReqDTO): Promise<any> {
//         if (!bookingReq) throw new Error("Request is null")
//         var vhc_part_id = bookingReq.getVhcPartId();
//         var vehiclePartner;

//         if (vhc_part_id > 0) await this.vehiclePartController.getDetailVehicle(vhc_part_id)
//             .then(data => vehiclePartner = data)
//             .catch(err => console.log(err));

//         if (!vehiclePartner) throw new Error("Vehicle partner is not existed!");
//         var booking = new Booking();
//         var vehicle = new cx_vhc();
//         var partner = new cx_part();
//         vehicle = vehiclePartner["vhc"];
//         partner = vehiclePartner["part"];
//         if (!(vehicle && partner)) throw new Error("Vehicle and Partner is not existed!")
//         var rentalDateStr = bookingReq.getBookRentDate();
//         var returnDateStr = bookingReq.getBookRetunDate();
//         if (!(rentalDateStr && returnDateStr)) throw new Error("Rental Date and Return Date is null!!")
//         var rentalDate = new Date(rentalDateStr);
//         var returnDate = new Date(returnDateStr);
//         if ((rentalDate.getTime() < new Date().getTime()) || (returnDate.getTime() < new Date().getTime()) || (returnDate.getTime() < rentalDate.getTime())) throw new Error("rental and return time is not invalid")

//         booking.vhc_part_id = vehiclePartner["vhc_part_id"];
//         booking.vhc_part_name = vehiclePartner["vhc_part_name"];
//         booking.book_rent_date = rentalDate;
//         booking.book_retun_date = returnDate;
//         booking.cstm_deli_addr = bookingReq.getCstmDeliAddr();
//         booking.cstm_deli_addr_lat = bookingReq.getCstmDeliAddrLat();
//         booking.cstm_deli_addr_lng = bookingReq.getCstmDeliAddrLng();
//         booking.book_day_num = this.getDayNum(rentalDate, returnDate, partner);
//         booking.book_exta_hour_num = this.getExtaHourNum(rentalDate, returnDate, partner)
//         booking.book_wday_num = this.getWdayNum(rentalDate, returnDate, partner)
//         booking.book_holi_num = this.getHoliNum(rentalDate, returnDate, partner)
//         booking.book_deli_form_id = bookingReq.getBookDeliFormId();
//         booking.promo_code = bookingReq.getPromoCode();

//         var result = null;
//         await this.calculateDetailPrice(booking, vehiclePartner)
//             .then(data => result = data)
//             .catch(err => console.log(err))
//         if (!result) throw new Error("Error API")
//         return result;
//     }

//     async calculateDetailPrice(booking: Booking, vhcPart) {
//         if (!booking || !vhcPart) throw new Error("Data is not be null!");
//         var defaPrice = vhcPart["vhc_part_defa_prie"] || 0
//         var priceTypes = new Array<cx_book_prie_type>();
//         var bookPriceDetails = new Array<BookingPriceDetailDTO>();
//         var priceTotal = 0;
//         var bookReq = new BookingReqDTO(booking);

//         await this.priceTypeRepo.getAll()
//             .then(result => priceTypes = result)
//             .catch(err => { throw new Error(err) })

//         if (priceTypes && priceTypes.length > 0) {
//             for (let i = 0; i < priceTypes.length; i++) {
//                 var dtlPrice = new cx_book_prie_detl();
//                 dtlPrice.book_id = booking.book_id;
//                 dtlPrice.book_prie_type_id = priceTypes[i].book_prie_type_id;

//                 switch (priceTypes[i].book_prie_type_code) {
//                     case "DAY_PRICE": {
//                         dtlPrice.prie_type_qaty = booking.book_day_num;
//                         dtlPrice.unit_prie = defaPrice;
//                         dtlPrice.detl_prie_tota = dtlPrice.unit_prie * dtlPrice.prie_type_qaty;
//                         await this.getBookPriceDetail(dtlPrice)
//                             .then(result => bookPriceDetails.push(result))
//                             .catch(err => console.log(err))
//                         priceTotal += dtlPrice.detl_prie_tota;
//                         break;
//                     }
//                     case "WDAY_PRICE": {
//                         var wdayExtraFee = this.getWdayExtraFee(vhcPart);

//                         dtlPrice.prie_type_qaty = booking.book_wday_num;
//                         dtlPrice.unit_prie = wdayExtraFee;
//                         dtlPrice.detl_prie_tota = dtlPrice.prie_type_qaty * dtlPrice.unit_prie;
//                         await this.getBookPriceDetail(dtlPrice)
//                             .then(result => bookPriceDetails.push(result))
//                             .catch(err => console.log(err))
//                         priceTotal += dtlPrice.detl_prie_tota;
//                         break;
//                     }
//                     case "HOLI_PRICE": {
//                         var holiExtraFee = this.getHoliExtraFee(vhcPart);

//                         dtlPrice.prie_type_qaty = booking.book_holi_num;
//                         dtlPrice.unit_prie = holiExtraFee;
//                         dtlPrice.detl_prie_tota = dtlPrice.prie_type_qaty * dtlPrice.unit_prie;
//                         await this.getBookPriceDetail(dtlPrice)
//                             .then(result => bookPriceDetails.push(result))
//                             .catch(err => console.log(err))
//                         priceTotal += dtlPrice.detl_prie_tota;
//                         break;
//                     }
//                     case "DELI_PRICE": {
//                         var deli = null;
//                         if (bookReq.getCstmDeliAddr() || (bookReq.getCstmDeliAddrLat() && bookReq.getCstmDeliAddrLng())) {
//                             await this.calculateDeliPrice(bookReq)
//                                 .then(result => deli = result)
//                                 .catch(err => console.log(err))
//                         }
//                         dtlPrice.prie_type_qaty = booking.book_deli_form_id;
//                         dtlPrice.unit_prie = deli ? deli["price"] : 0;
//                         dtlPrice.detl_prie_tota = dtlPrice.prie_type_qaty * dtlPrice.unit_prie;
//                         await this.getBookPriceDetail(dtlPrice)
//                             .then(result => bookPriceDetails.push(result))
//                             .catch(err => console.log(err))
//                         priceTotal += dtlPrice.detl_prie_tota;
//                         break;
//                     }
//                     case "DAYPACK_PRICE": {
//                         dtlPrice.prie_type_qaty = 0;
//                         dtlPrice.unit_prie = 0;
//                         dtlPrice.detl_prie_tota = dtlPrice.prie_type_qaty * dtlPrice.unit_prie;
//                         await this.getBookPriceDetail(dtlPrice)
//                             .then(result => bookPriceDetails.push(result))
//                             .catch(err => console.log(err))
//                         priceTotal += dtlPrice.detl_prie_tota;
//                         break;
//                     }
//                     case "PROMO_PRICE": {
//                         var promotion = 0;
//                         if (bookReq.getPromoCode())
//                             await this.calculatePromoPrice(bookReq)
//                                 .then(result => promotion = result)
//                                 .catch(err => console.log(err));
//                         if (MyUtil.isPercent(promotion)) promotion = (promotion / 100) * defaPrice
//                         dtlPrice.prie_type_qaty = booking.book_day_num;
//                         dtlPrice.unit_prie = promotion
//                         dtlPrice.detl_prie_tota = dtlPrice.prie_type_qaty * dtlPrice.unit_prie;
//                         await this.getBookPriceDetail(dtlPrice)
//                             .then(result => bookPriceDetails.push(result))
//                             .catch(err => console.log(err))
//                         priceTotal -= dtlPrice.detl_prie_tota
//                         break;
//                     }
//                 }
//             }
//         }
//         console.log("bookPriceDetails", bookPriceDetails);
//         console.log("priceTotal", priceTotal);

//         return {
//             booking_price_details: bookPriceDetails,
//             price_total: priceTotal
//         }

//     }

//     public async getBookingsByUserId(user_acc_id: number) {
//         if ((user_acc_id <= 0) || (!user_acc_id)) throw new Error("User's id not null");
//         var user = null;
//         await this.userRepository.getOne(user_acc_id)
//             .then(data => user = data)
//             .catch(err => console.log(err))
//         if (!user) throw new Error("User is not existed!");
//         var bookings = [];
//         await this.bookingRepository.findByUserId(user.user_acc_id)
//             .then(data => bookings = data)
//             .catch(err => console.log(err))
//         return bookings;
//     }

//     public async getBookingsByToken(token: string) {
//         if (!token) throw new Error("User's token not null");
//         var user = null;
//         await this.userRepository.findByToken(token)
//             .then(data => user = data)
//             .catch(err => console.log(err))
//         if (!user) throw new Error("User is not existed!");
//         var bookings = new Array<cx_book>();
//         await this.bookingRepository.findByUserId(user.user_acc_id)
//             .then(data => bookings = data)
//             .catch(err => console.log(err));
//         var result = new Array<BookingResDTO>();
//         if (bookings && (bookings.length > 0)) {
//             for (let booking of bookings) {
//                 var detailBooking = await this.getDetailBooking(booking);
//                 if (detailBooking) result.push(detailBooking)
//                 else console.log("Error get detail booking")
//             }
//         }

//         return result;
//     }

//     getDistanceMatrix = (origin, destination) => new Promise((resolve, reject) => {
//         // distance.apiKey = 'AIzaSyALSIOWSz6C9xByjYNfSo20LVKrCAyatiw';
//         distance.sensor = false
//         console.log(origin)
//         console.log(destination)
//         distance.get(
//             {
//                 index: 1,
//                 origin: origin,
//                 destination: destination
//             }, (err, response) => {
//                 if (err) {
//                     console.log(err);
//                     reject(response);
//                 }
//                 else {
//                     console.log(response);
//                     resolve(response)
//                 }

//             })
//     });



//     getDetailBooking = async (booking: Booking) => {
//         var result = new BookingResDTO(booking);
//         console.log(result);

//         var bookFedbak = new Array<booking_feedback>();
//         await this.bookingFedbakRepository.findByBookingId(result.getBookId())
//             .then(feedbacks => bookFedbak = feedbacks)
//             .catch(err => console.log(err))
//         result.setBookFedBak(bookFedbak);

//         var bookPrices = new Array<cx_book_prie_detl>();
//         await this.bookingPriceDetailRepo.findByBookingId(result.getBookId())
//             .then(result => bookPrices = result);
//         var bookPriceDetails = new Array<BookingPriceDetailDTO>();
//         if (bookPrices && bookPrices.length > 0) {
//             for (let i = 0; i < bookPrices.length; i++) {
//                 await this.getBookPriceDetail(bookPrices[i])
//                     .then(priceDetail => bookPriceDetails.push(priceDetail))
//                     .catch(err => console.log(err))
//             }
//         }
//         result.setBookPrieDetl(bookPriceDetails);

//         var bookStatus = new booking_status();
//         await this.bookingStatusRepo.getById(result.getBookStt().book_stt_id)
//             .then(status => bookStatus = status)
//             .catch(err => console.log(err))
//         result.setBookStt(bookStatus);

//         var payMethod = new cx_pay_meth();
//         await this.payMethodRepo.getOne(result.getCstmPayMeth().pay_meth_id)
//             .then(pay => payMethod = pay)
//             .catch(err => console.log(err))
//         result.setCstmPaymeth(payMethod);

//         var vhcPart = new cx_vhc_part();
//         await this.vhcPartRepository.getOne(result.getVhcPartId())
//             .then(data => vhcPart = data)
//             .catch(err => console.log(err))
//         if (!vhcPart) throw new Error("Not found partner's vehicle");

//         var vhcImgs = new Array<cx_vhc_img>();
//         await this.imageRepository.findByImageTable("cx_vhc", vhcPart.vhc_id)
//             .then(data => vhcImgs = data)
//             .catch(err => console.log(err))

//         result.setVhcImgs(vhcImgs)

//         return result;
//     }

//     getBookPriceDetail = async (bookPriceDetail: cx_book_prie_detl) => {

//         var bookPriceDetailDTO = new BookingPriceDetailDTO(bookPriceDetail);
//         if (bookPriceDetailDTO) {
//             await this.priceTypeRepo.findById((bookPriceDetailDTO.getBookPrieType().book_prie_type_id))
//                 .then(result => {
//                     bookPriceDetailDTO.setBookPrieType(result);
//                 })
//                 .catch(err => console.log(err))
//         }
//         return bookPriceDetailDTO
//     }

//     getDayNum = (rentalDate: Date, returnDate: Date, partner): number => {
//         var rtlDate = rentalDate;
//         var rtnDate = returnDate;
//         var rtl = new Date(MyUtil.getDateFormatEn(rtlDate));
//         var rtn = new Date(MyUtil.getDateFormatEn(rtnDate));
//         if (!rtl || !rtn || !partner) return 0
//         var rtlTime = rtl.getTime();
//         var rtnTime = rtn.getTime();
//         if (rtnTime < rtlTime) return 0
//         var dayNum = (rtnTime - rtlTime) / (24 * 1000 * 3600) + 1;
//         return dayNum ? dayNum : 0
//     }

//     getWdayNum = (rentalDate: Date, returnDate: Date, partner): number => {
//         if (!rentalDate || !returnDate || !partner) return 0
//         var wdays = MyUtil.getWdays(rentalDate, returnDate, partner);
//         var holis = MyUtil.getHolis(rentalDate, returnDate, partner);
//         var holiIsWday = MyUtil.getDayNumHoliIsWday(wdays, holis);
//         var wdayNum = wdays.length - holiIsWday;
//         return wdayNum > 0 ? wdayNum : 0

//     }

//     getHoliNum = (rentalDate, returnDate, partner): number => {
//         var rentalDate = rentalDate;
//         var returnDate = returnDate;
//         if (!rentalDate || !returnDate || !partner) return 0;
//         var holis = MyUtil.getHolis(rentalDate, returnDate, partner);
//         return holis ? holis.length : 0
//     }

//     getExtaHourNum = (rentalDate, returnDate, partner): number => {
//         if (!rentalDate || !returnDate || !partner) return 0
//         return 0
//     }

//     getWdayExtraFee = (vehicle) => {
//         if (!vehicle) return 0;
//         var price = 0;
//         if (vehicle.part.part_wdays[0]) {
//             var fee = vehicle.part.part_wdays[0].part_wday_exta_fee;
//             if (MyUtil.isPercent(fee)) {
//                 price = vehicle.vhc_part_defa_prie * fee / 100;
//             } else {
//                 price = fee;
//             }
//         }
//         return price
//     }

//     getHoliExtraFee = (vehicle) => {
//         if (!vehicle) return 0;
//         var price = 0;
//         if (vehicle.part.part_holis[0]) {
//             var fee = vehicle.part.part_holis[0].part_holi_exta_fee;
//             if (MyUtil.isPercent(fee)) {
//                 price += vehicle.vhc_part_defa_prie * fee / 100
//             } else price += fee
//         }
//         return price
//     }

//     getSumPrice = (detailPrices: Array<cx_book_prie_detl>): number => {
//         var sum = 0
//         if (detailPrices && detailPrices.length > 0) {
//             for (let i = 0; i < detailPrices.length; i++) {
//                 sum += detailPrices[i].detl_prie_tota
//             }
//         }
//         return sum
//     }

//     createBookingCode = async (booking: Booking): Promise<string> => {
//         var city = new cx_city();
//         city = await this.cityRepository.findById(booking.city_id);
//         if (!city) return "";

//         var vhcType = new cx_vhc_type();
//         vhcType = await this.typeRepository.getOne(booking.vhc_type_id)
//         if (!vhcType) return "";
//         var rentalDate = booking.book_rent_date;

//         var { day, month } = MyUtil.getMonthDay(rentalDate);
//         var dateStr = rentalDate.getFullYear().toString().substr(-2) + month
//         var book_id = booking.book_id;
//         book_id = (book_id > 10000) ? book_id : (10000 + book_id)
//         var bookCode = city.city_code + vhcType.vhc_type_code + dateStr + book_id
//         return bookCode ? bookCode : ""

//     }

//     saveDetailPrice = async (dtlPrice: BookingPriceDetailDTO[]): Promise<cx_book_prie_detl[]> => {
//         var result = new Array<cx_book_prie_detl>();
//         if (dtlPrice && dtlPrice.length > 0) {
//             for (let i = 0; i < dtlPrice.length; i++) {
//                 var price = new cx_book_prie_detl();
//                 price.book_id = dtlPrice[i].getBookId();
//                 price.book_prie_detl_id = dtlPrice[i].getBookPrieDtlId();
//                 price.book_prie_type_id = dtlPrice[i].getBookPrieType().book_prie_type_id;
//                 price.detl_prie_tota = dtlPrice[i].getDetlPrieTota();
//                 price.prie_type_qaty = dtlPrice[i].getPrieTypeQaty();
//                 price.unit_prie = dtlPrice[i].getUnitPrie();
//                 await this.bookingPriceDetailRepo.create(price)
//                     .then(data => result.push(data))
//                     .catch(err => { throw new Error(err) })
//             }
//         }
//         return result;
//     }

// }