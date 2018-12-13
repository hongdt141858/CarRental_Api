import {partner_holiday as PartHoliday} from "../entities/partner_holiday"
import { Repository, getConnectionManager } from "typeorm";

export default class PartDayPackRepository{
    private partHolidayRepo: Repository<PartHoliday>;
    constructor() {
        this.partHolidayRepo = getConnectionManager().get("car_rental").getRepository(PartHoliday);
    }

    public async getAll() {
        return await this.partHolidayRepo.find();
    }
    public async getOne(id: number){
        return await this.partHolidayRepo.findOne({"partner_holiday_id": id})
    }
    public async create(partHoliday: PartHoliday){
        return await this.partHolidayRepo.save(partHoliday);
    }
    public async createList(partHoliday: PartHoliday[]){
        return await this.partHolidayRepo.save(partHoliday);
    }

    public async findByPartId(id: number){
        return await this.partHolidayRepo.find({"partner_id": id});
    }

    public async delete(id: number){
        let partHoliday = await this.getOne(id);
        await this.partHolidayRepo.delete(id);
        return partHoliday;
    }

    public async deleteByPartId(id: number){
        return await this.partHolidayRepo.delete({partner_id: id}); 
    }
}