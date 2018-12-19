import { vehicle as Vehicle } from "../entities/vehicle";
import IVehicleRepository from "./irepository/IVehicleRepository";
import { Connection, Repository, getConnectionManager, In } from 'typeorm';

export default class VehicleRepository  implements IVehicleRepository {

    private vehicleRepo: Repository<Vehicle>;
    constructor() {
        this.vehicleRepo = getConnectionManager().get("car_rental").getRepository(Vehicle);
    }

    public async getAll(): Promise<Array<Vehicle>> {
        return await this.vehicleRepo.find();
    }

    public async getOne(id: number): Promise<Vehicle> {
        return await this.vehicleRepo.findOne({"vehicle_id": id});
        
    }

    public async create(vehicle: Vehicle): Promise<Vehicle> {
        await this.vehicleRepo.save(vehicle);
        return await this.findByName(vehicle["brand_name"], vehicle["model_name"],vehicle["vehicle_name"]);
    }

    public async delete(id: number): Promise<Vehicle> {
        let vehicle = await this.getOne(id);
        await this.vehicleRepo.delete(id);
        return vehicle
    }
    public async update(id: number, vehicle: Vehicle): Promise<Vehicle> {
        await this.vehicleRepo.update(id, vehicle);
        return await this.getOne(id);
    }

    public async findByVehicleName(name: string): Promise<Vehicle> {
        return await this.vehicleRepo.findOne({ "vehicle_name": name })

    }

    public async findByVehicleOption(option: any): Promise<any> {
        if(option["seat_id"] && Array.isArray(option["seat_id"])){
            option = Object.assign(option, {"seat_id": In( option["seat_id"])})
        }
        console.log(option)
        return await this.vehicleRepo.find(option)
    }

    public async  findIdByName(brand_name, model_name, vehicle_name):Promise <Vehicle>{
        console.log({"brand_name":brand_name,"model_name": model_name, "vehicle_name": vehicle_name}, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        return  await this.vehicleRepo.findOne({"brand_name":brand_name,"model_name": model_name, "vehicle_name": vehicle_name})
    }

    public async  findByName(brand_name, model_name, vehicle_name):Promise <Vehicle>{
        return  await this.vehicleRepo.findOne({"brand_name":brand_name,"model_name": model_name, "vehicle_name": vehicle_name})
    }


    public async createList(list: Array<Vehicle>): Promise<Array<Vehicle>> {
        return await this.vehicleRepo.save(list)
    }

    public async findIn(list: Array<string>): Promise<Array<Vehicle>> {
        return await this.vehicleRepo.find({ "vehicle_name": In(list) })
        
    }
}