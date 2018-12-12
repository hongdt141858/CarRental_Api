import { design as DesignVehicle } from "../entities/design";
import IDesignRepository from "./irepository/IDesignRepository";
import {Connection, Repository, getConnectionManager} from 'typeorm';

export default class DesignRepository implements IDesignRepository {

    private designRepo: Repository<DesignVehicle>;
    constructor() {
        this.designRepo = getConnectionManager().get("car_rental").getRepository(DesignVehicle);
    }

    public async getAll(): Promise<Array<DesignVehicle>> {
        return await this.designRepo.find();
    }

    public async getOne(id: number): Promise<DesignVehicle> {
        return await this.designRepo.findOne(id);
    }

    public async create(design: DesignVehicle): Promise<DesignVehicle> {
        return await this.designRepo.save(design);
    }

    public async delete(id: number): Promise<DesignVehicle> {
        let design = await this.getOne(id);
        await this.designRepo.delete(id);
        return design;
    }
    public async update(id: number, design: DesignVehicle): Promise<DesignVehicle> {
        let typeVehicleUpdate = await this.designRepo.update(id, design);
        return this.getOne(id);
    }

    public async findByName(name: string): Promise<DesignVehicle> {
        let designUpdate = await this.designRepo.findOne({ "design_name": name })
        return designUpdate;
    }
}