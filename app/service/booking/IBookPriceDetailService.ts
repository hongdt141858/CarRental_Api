import {booking_price_detail as BookingPriceDetail} from '../../entities/booking_price_detail'
export default interface IBookPriceDetailService{
    getAll(): Promise<BookingPriceDetail[]>;
    getOne(id: number): Promise<BookingPriceDetail>;
    create(bookingReq: BookingPriceDetail): Promise<BookingPriceDetail>
    deleteByBookId(book_id: number):Promise<BookingPriceDetail>
}