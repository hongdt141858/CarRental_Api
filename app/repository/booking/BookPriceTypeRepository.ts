import { Repository, getConnectionManager } from "typeorm";
import { booking_price_type } from "../../entities/booking_price_type";

export default class BookPriceTypeRepository {
    private bookPriceTypeRepository: Repository<booking_price_type>;
    constructor() {
        this.bookPriceTypeRepository = getConnectionManager().get("car_rental").getRepository(booking_price_type);
    }

    public async getAll(){
        return await this.bookPriceTypeRepository.find();
    }

    public async findById(priceTypeId: number) : Promise<booking_price_type> {
        return await this.bookPriceTypeRepository.findOne({booking_price_type_id: priceTypeId})
    }
}