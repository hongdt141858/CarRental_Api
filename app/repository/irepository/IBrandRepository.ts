import { brand as Brand } from "../../entities/brand";

export default interface IBrandRepository {
    getAll(): Promise<Array<Brand>>
    getOne(id: number): Promise<Brand>
    create(brand: Brand):Promise<Brand>
    delete(id: number): Promise<any>
    update(id: number, brand: Brand): Promise<any> 
    findByName(name: string): Promise<Brand>
}