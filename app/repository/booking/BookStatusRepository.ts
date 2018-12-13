import { booking_status } from "../../entities/booking_status";
import { Repository, getConnectionManager } from "typeorm";

export default class BookStatusRepository {
    private bookStatusRepository: Repository<booking_status>;
    constructor() {
        this.bookStatusRepository = getConnectionManager().get("car_rental").getRepository(booking_status);
    }

    public async getAll(){
        return await this.bookStatusRepository.find();
    }

    public async getById(id: number){
        return await this.bookStatusRepository.findOne({booking_status_id: id})
    }
}