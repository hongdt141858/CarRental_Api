import { booking as Booking } from "../../entities/booking"
import { Repository, getConnectionManager } from "typeorm";

export default class BookingRepository {
    private bookRepository: Repository<Booking>;
    constructor() {
        this.bookRepository = getConnectionManager().get("car_rental").getRepository(Booking);
    }

    public async getAll() {
        var bookings = await this.bookRepository
            .createQueryBuilder("booking")
            .orderBy("booking.booking_code", "DESC")
            .limit(100)
            .getMany();
        return bookings
    }
    public async getOne(id: number) {
        return await this.bookRepository.findOne({ booking_id: id })
    }
    public async create(booking: any) {
        delete booking["booking_id"]
        console.log(booking)
        return await this.bookRepository.save(booking);
    }
    public async update(id: number, booking): Promise<any> {
        return await this.bookRepository.update(id, booking);
    }
    public async findByCode(code: string) {
        return await this.bookRepository.find({ booking_code: code });
    }
    public async findByUserId(user_account_id: number) {
        return await this.bookRepository.find({ "user_account_id": user_account_id });
    }
}