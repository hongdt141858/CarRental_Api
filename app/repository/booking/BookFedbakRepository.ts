import { booking_feedback } from "../../entities/booking_feedback";
import { Repository, getConnectionManager } from "typeorm";

export default class BookFedbakRepository {
    private bookFedbakRepository: Repository<booking_feedback>;
    constructor() {
        this.bookFedbakRepository = getConnectionManager().get("car_rental").getRepository(booking_feedback);
    }

    public async getAll(){
        return await this.bookFedbakRepository.find();
    }

    public async findByBookingId(bookingId: number){
        return await this.bookFedbakRepository.find({"booking_id": bookingId})
    }
}