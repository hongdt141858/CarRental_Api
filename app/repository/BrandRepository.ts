import {brand as Brand} from "../entities/brand"
import { Repository, getConnectionManager } from "typeorm";
import IBrandRepository from './irepository/IBrandRepository'

export default class BrandRepository implements IBrandRepository{
    private brandRepo: Repository<Brand>;
    constructor() {
        this.brandRepo = getConnectionManager().get("car_rental").getRepository(Brand);
    }

    public async getAll() {
        return await this.brandRepo.find();
    }
    public async delete(id){
        return await this.brandRepo.delete(id);
    }

    public async update(id, brand){
        return await this.brandRepo.update(id, brand);
    }
    public async getOne(id: number){
        return await this.brandRepo.findOne({"brand_id": id})
    }
    public async create(brand: Brand){
        return await this.brandRepo.save(brand);
    }
    
    public async findByName (name: string){
        return await this.brandRepo.findOne({"brand_name": name})
    }
    
}