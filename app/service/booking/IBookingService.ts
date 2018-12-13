import {booking as Booking} from '../../entities/booking'

export default interface IBookingService{
    getAll(): Promise<Booking[]>;
    getOne(id: number): Promise<Booking>;
    create(bookingReq: Booking): Promise<Booking>
    getByCode(code: string): Promise<Booking>;
    calculateDeliPrice(bookingReq: Booking): Promise<any>;
    calculatePromoPrice(bookingReq: Booking): Promise<any>;
    getDetailPrice(bookingReq: Booking): Promise<any>;
    getBookingsByUserId(user_account_id: number): Promise<any>;
    getBookingsByToken(token: string): Promise<any>;
}