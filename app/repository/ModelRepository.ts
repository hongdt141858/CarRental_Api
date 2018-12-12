import { model as Model} from "../entities/model";
import IModelRepository from "./irepository/IModelRepository";
import {Connection, Repository, getConnectionManager, In} from 'typeorm';


export default class ModelRepository implements IModelRepository {

    private modelRepo: Repository<Model>;
    constructor() {
        this.modelRepo =  getConnectionManager().get("car_rental").getRepository(Model);
    }

    public async getAll(): Promise<Array<Model>> {
        return await this.modelRepo.find();
    }

    public async getOne(id: number): Promise<Model> {
        return await this.modelRepo.findOne(id);
    }

    public async create(model: Model): Promise<Model> {
        return await this.modelRepo.save(model);
    }

    public async delete(id: number): Promise<Model> {
        let model = await this.getOne(id);
        await this.modelRepo.delete(id);
        return model;

    }
    public async update(id: number, model: Model): Promise<Model> {
        let modelUpdate = await this.modelRepo.update(id, model);
        return await this.getOne(id);
    }

    public async findByName(model_name: string): Promise<Model> {
        console.log(model_name)
        let model = await this.modelRepo.findOne({ "model_name": model_name })
        console.log(model, "//////////")
        return model;
    }

    public async findByBrandId(brand_id: number): Promise<any> {
        let result = await this.modelRepo.find({ "brand_id": brand_id })
        return result;
    }
   
}