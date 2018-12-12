import {weekday as WeekDay} from "../entities/weekday"
import { Repository, getConnectionManager } from "typeorm";

export default class ProcedureRepository {
    private wdayRepo: Repository<WeekDay>;
    constructor() {
        this.wdayRepo = getConnectionManager().get("car_rental").getRepository(WeekDay);
    }

    public async getAll() {
        return await this.wdayRepo.find();
    }
    public async getOne(id: number){
        return await this.wdayRepo.findOne({"weekday_id": id})
    }
    public async create(wday: WeekDay){
        return await this.wdayRepo.save(wday);
    }

    public async findByIndex(index: number){
        return await this.wdayRepo.findOne({"weekday_index": index})
    }

    public async findByName(name: string){
        return await this.wdayRepo.findOne({"weekday_name": name});
    }
    
    
}