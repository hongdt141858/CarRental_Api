import { fuel as Fuel} from "../entities/fuel";
import IFuelRepository from "./irepository/IFuelRepository";
import {Connection, Repository, getConnectionManager, In} from 'typeorm';


export default class FuelRepository implements IFuelRepository {

    private fuelRepo: Repository<Fuel>;
    constructor() {
        this.fuelRepo =  getConnectionManager().get("car_rental").getRepository(Fuel);
    }

    public async getAll(): Promise<Array<Fuel>> {
        return await this.fuelRepo.find();
    }

    public async getOne(id: number): Promise<Fuel> {
        return await this.fuelRepo.findOne(id);
    }

    public async create(fuel: Fuel): Promise<Fuel> {
        return await this.fuelRepo.save(fuel);
    }

    public async delete(id: number): Promise<Fuel> {
        let fuel = await this.getOne(id);
        await this.fuelRepo.delete(id);
        return fuel;

    }
    public async update(id: number, fuel: Fuel): Promise<Fuel> {
        let fuelUpdate = await this.fuelRepo.update(id, fuel);
        return await this.getOne(id);
    }

    public async findByName(fuel_name: string): Promise<Fuel> {
        let fuel = await this.fuelRepo.findOne({ "fuel_name": fuel_name })
        return fuel;
    }

   
}