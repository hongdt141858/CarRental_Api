import { transmission as Transmission } from "../entities/transmission";
import ITransmissionRepository from "./irepository/ITransmissionRespository";
import {Connection, Repository, getConnectionManager} from 'typeorm';

export default class TransmissionRepository implements ITransmissionRepository {

    private transmissionRepo: Repository<Transmission>;
    constructor() {
        this.transmissionRepo = getConnectionManager().get("car_rental").getRepository(Transmission);
    }

    public async getAll(): Promise<Array<Transmission>> {
        return await this.transmissionRepo.find();
    }

    public async getOne(id: number): Promise<Transmission> {
        return await this.transmissionRepo.findOne(id);
    }

    public async create(transmission: Transmission): Promise<Transmission> {
        return await this.transmissionRepo.save(transmission);
    }

    public async delete(id: number): Promise<Transmission> {
        let transmission = await this.getOne(id);
        await this.transmissionRepo.delete(id);
        return transmission
    }
    public async update(id: number, transmission: Transmission): Promise<Transmission> {
        let typeVehicleUpdate = await this.transmissionRepo.update(id, transmission);
        return await this.getOne(id);
    }

    public async findByName(name: string): Promise<Transmission> {
        return await this.transmissionRepo.findOne({ "transmission_name": name })
    }

    public async findBySlug(slug: string): Promise<Transmission> {
        return await this.transmissionRepo.findOne({ "transmission_slug": slug })
    }

}