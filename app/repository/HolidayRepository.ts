import {holiday as Holiday} from "../entities/holiday"
import { Repository, getConnectionManager } from "typeorm";

export default class ProcedureRepository {
    private holiRepo: Repository<Holiday>;
    constructor() {
        this.holiRepo = getConnectionManager().get("car_rental").getRepository(Holiday);
    }

    public async getAll() {
        return await this.holiRepo.find();
    }
    public async getOne(id: number){
        return await this.holiRepo.findOne({"holiday_id": id})
    }
    public async create(holiday: Holiday){
        return await this.holiRepo.save(holiday);
    }

    public async findByName(name: string){
        return await this.holiRepo.findOne({"holiday_name": name});
    }
}