import { model as Model } from "../../entities/model";

export default interface IModelRepository {
    getAll(): Promise<Array<Model>>
    getOne(id: number): Promise<Model>
    create(model: Model):Promise<Model>
    delete(id: number): Promise<Model>
    update(id: number, model: Model): Promise<Model> 
    findByName(model_name: string): Promise<Model>
    findByBrandId (brand_id: number):Promise<any>
}