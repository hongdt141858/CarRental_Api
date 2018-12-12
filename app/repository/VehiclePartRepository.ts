import { vehicle_partner as VehiclePartner } from "../entities/vehicle_partner"
import { Repository, getConnectionManager, In, Between } from "typeorm";

export default class VehiclePartRepository {
    private vehicleRepo: Repository<VehiclePartner>;
    constructor() {
        this.vehicleRepo = getConnectionManager().get("car_rental").getRepository(VehiclePartner);
    }


    public async getAll(): Promise<Array<VehiclePartner>> {
        return await this.vehicleRepo.find();
    }

    public async getOne(id: number): Promise<VehiclePartner> {
        return await this.vehicleRepo.findOne({"vehicle_partner_id":id});
    }

    public async create(vehicle: VehiclePartner): Promise<VehiclePartner> {
        return await this.vehicleRepo.save(vehicle);
    }

    public async delete(id: number): Promise<VehiclePartner> {
        let vehicle = await this.getOne(id);
        vehicle = Object.assign(vehicle, {"vehicle_partner_delete": new Date()})
        await this.vehicleRepo.update(id, vehicle);
        return vehicle
    }
    public async update(id: number, vehicle: VehiclePartner): Promise<VehiclePartner> {
        await this.vehicleRepo.update(id, vehicle);
        return await this.getOne(id);
    }

    public async findByVehicleName(name: string): Promise<VehiclePartner> {
        return await this.vehicleRepo.findOne({ "vehicle_partner_name": name })
    }

    public async findByVehicleOption(option: any): Promise<any> {
        var option1 = Object.assign(option, {"vehicle_partner_delete": null})
        return await this.vehicleRepo.find(option1);

    }


    public async createList(list: Array<VehiclePartner>): Promise<Array<VehiclePartner>> {
        let vehicle = await this.vehicleRepo.save(list)
        return vehicle;
    }

    public async findVehicles(vehicleIds: number[], partnerIds: number[], price_from: number, price_to: number, vehicle_partner_hide): Promise<any> {
        let obj = {};
        obj["vehicle_partner_delete"] = null
        if ((vehicle_partner_hide == 0 || vehicle_partner_hide == 1) && vehicle_partner_hide)
            obj["vehicle_partner_hide"] = vehicle_partner_hide;
        if (vehicleIds.length > 0)
            obj["vehicle_id"] = In(vehicleIds);
        else
            return []
        if (partnerIds.length > 0)
            obj["partner_id"] = In(partnerIds);
        else
            return 0;
        if (price_from && price_to)
            obj["vehicle_partner_default_price"] = Between(price_from, price_to)

        let vehicle = await this.vehicleRepo.findAndCount(obj)

        return vehicle;
    }
}