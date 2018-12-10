import { option_vehicle as OptionVehicle } from "../entities/option_vehicle";
import { Connection, Repository } from 'typeorm';
import IOptionVehicleRepository from "./irepository/IOptionVehicleRepository";
import { getConnectionManager } from 'typeorm'

export default class optionVehicleRepository implements IOptionVehicleRepository {

    private optionVehicleRepo: Repository<OptionVehicle>;

    constructor() {
        this.optionVehicleRepo = getConnectionManager().get("car_rental").getRepository(OptionVehicle);
    }

    public async getAll(): Promise<Array<OptionVehicle>> {
        return await this.optionVehicleRepo.find();
    }

    public async getOne(id: number): Promise<OptionVehicle> {
        return await this.optionVehicleRepo.findOne(id);
    }

    public async create(optionVehicle: OptionVehicle): Promise<OptionVehicle> {
        let result = await this.findByOptions({ option_id: optionVehicle.option_id, vehicle_id: optionVehicle.vehicle_id })
        if (result)
            return;
        return await this.optionVehicleRepo.save(optionVehicle);
    }

    public async createList(list: Array<OptionVehicle>): Promise<Array<OptionVehicle>> {
        return await this.optionVehicleRepo.save(list);
    }

    public async delete(id: number): Promise<OptionVehicle> {
        let optionVehicle = await this.getOne(id);
        await this.optionVehicleRepo.delete(id);
        return optionVehicle;

    }
    public async update(id: number, optionVehicle: OptionVehicle): Promise<OptionVehicle> {
        await this.optionVehicleRepo.update(id, optionVehicle);
        return this.getOne(id);
    }

    public async findByOptionId(optionId: number): Promise<OptionVehicle> {
        let optionVehicle = this.optionVehicleRepo.findOne({ "option_id": optionId })
        return optionVehicle;
    }

    public async findByVehicleId(vehicleId: number): Promise<OptionVehicle[]> {
        return await this.optionVehicleRepo.find({ "vehicle_id": vehicleId })

    }

    public async findByOptions(options: any): Promise<any> {
        return await this.optionVehicleRepo.findOne(options);
    }

}