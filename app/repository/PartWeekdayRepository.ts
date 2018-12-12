import {partner_weekday as PartWeekday} from "../entities/partner_weekday"
import { Repository, getConnectionManager } from "typeorm";

export default class PartWeekDayRepository{
    private partWeekDayRepo: Repository<PartWeekday>;
    constructor() {
        this.partWeekDayRepo = getConnectionManager().get("car_rental").getRepository(PartWeekday);
    }

    public async getAll() {
        return await this.partWeekDayRepo.find();
    }
    public async getOne(id: number){
        return await this.partWeekDayRepo.findOne({"partner_weekday_id": id})
    }
    public async create(partWeekday: PartWeekday){
        return await this.partWeekDayRepo.save(partWeekday);
    }
    public async createList(partWeekday: PartWeekday[]){
        return await this.partWeekDayRepo.save(partWeekday);
    }
    public async findByPartId(id: number){
        return await this.partWeekDayRepo.find({"partner_id": id});
    }

    public async delete(id: number){
        let partWeekday = await this.getOne(id);
        await this.partWeekDayRepo.delete(id);
        return partWeekday;
    }
    public async deleteByPartId(id: number){
        return await this.partWeekDayRepo.delete({partner_id: id}); 
    }
}