import {cx_book_prie_detl as BookPriceDetail} from '../../entities/booking/cx_book_prie_detl'
export default interface IBookPriceDetailService{
    getAll(): Promise<BookPriceDetail[]>;
    getOne(id: number): Promise<BookPriceDetail>;
    create(bookingReq: BookPriceDetail): Promise<BookPriceDetail>
    deleteByBookId(book_id: number):Promise<BookPriceDetail>
}