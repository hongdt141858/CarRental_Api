import { Repository, getConnectionManager } from "typeorm";
import { booking_price_detail } from "../../entities/booking_price_detail";

export default class BookPriceDetailRepository {
    private bookPriceDetailRepository: Repository<booking_price_detail>;
    constructor() {
        this.bookPriceDetailRepository = getConnectionManager().get("car_rental").getRepository(booking_price_detail);
    }

    public async getAll(){
        return await this.bookPriceDetailRepository.find();
    }

    public async findByBookingId(bookingId: number){
        return await this.bookPriceDetailRepository.find({"booking_id": bookingId})
    }

    public async create(detail: booking_price_detail){
        return await this.bookPriceDetailRepository.save(detail)
    }

    public async deleteByBookId(booking_id: number) {
        return await this.bookPriceDetailRepository.delete({"booking_id": booking_id });
    }
    
}