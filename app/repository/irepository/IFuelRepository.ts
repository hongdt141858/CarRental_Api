import { fuel as Fuel } from "../../entities/fuel";

export default interface IDesignRepository {
    getAll(): Promise<Array<Fuel>>
    getOne(id: number): Promise<Fuel>
    create(fuel: Fuel):Promise<Fuel>
    delete(id: number): Promise<any>
    update(id: number, fuel: Fuel): Promise<any> 
    findByName(name: string): Promise<Fuel>
}