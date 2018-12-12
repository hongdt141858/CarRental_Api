import { seat as Seat } from "../entities/seat";
import ISeatRepository from "./irepository/ISeatRepository";
import {Repository, getConnectionManager} from 'typeorm';

export default class SeatRepo implements ISeatRepository {

    private seatRepo: Repository<Seat>;
    constructor() {
        this.seatRepo = getConnectionManager().get("car_rental").getRepository(Seat);
    }

    public async getAll(): Promise<Array<Seat>> {
        return await this.seatRepo.find();
    }

    public async getOne(id: number): Promise<Seat> {
        return await this.seatRepo.findOne(id);
    }

    public async create(seat: Seat): Promise<Seat> {
        return await this.seatRepo.save(seat);
    }

    public async delete(id: number): Promise<Seat> {
        let seat = await this.getOne(id);
        await this.seatRepo.delete(id);
        return seat;

    }
    public async update(id: number, seat: Seat): Promise<Seat> {
        let seatUpdate = await this.seatRepo.update(id, seat);
        return await this.getOne(id);
    }

    public async findByName(num: number): Promise<Seat> {
        var result = await this.seatRepo.findOne({ "seat_number": num })
        if(!result)
        console.log(num, "????????????????????????")
        return result
    }
 
}