import {booking_price_detail as BookPriceDetail} from '../../entities/booking_price_detail'
import IBookPriceDetailService from './IBookPriceDetailService'
import BookPriceDetailRepository from '../../repository/booking/BookPriceDetailRepository'

export default class BookPriceDetailService implements IBookPriceDetailService{
    private bookDetailRepo;

    constructor(){
        this.bookDetailRepo = new BookPriceDetailRepository();
    }
    public async getAll(){
        return await this.bookDetailRepo.getAll();
    };
    public async getOne(id: number){
        return await this.bookDetailRepo.getOne(id);
    }
    public async create(bookingReq: BookPriceDetail){
        return await this.bookDetailRepo.create(bookingReq)
    }
    public async deleteByBookId(book_id: number){
        return await this.bookDetailRepo.deleteByBookId(book_id)
    }
}