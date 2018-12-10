import {city as City} from "../entities/city"
import { Repository, getConnectionManager } from "typeorm";
import ICityRepository from './irepository/ICityRepository'

export default class CityRepository implements ICityRepository{
    private cityRepo: Repository<City>;
    constructor() {
        this.cityRepo = getConnectionManager().get("car_rental").getRepository(City);
    }

    public async getAll() {
        return await this.cityRepo.find();
    }
    public async delete(id){
        return await this.cityRepo.delete(id);
    }

    public async update(id, city){
        return await this.cityRepo.update(id, city);
    }
    public async getOne(id: number){
        return await this.cityRepo.findOne({"city_id": id})
    }
    public async create(city: City){
        return await this.cityRepo.save(city);
    }
    
    public async findByName (name: string){
        return await this.cityRepo.findOne({"city_name": name})
    }
    
}