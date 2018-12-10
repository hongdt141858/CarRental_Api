import { design as Design } from "../../entities/design";

export default interface IDesignRepository {
    getAll(): Promise<Array<Design>>
    getOne(id: number): Promise<Design>
    create(design: Design):Promise<Design>
    delete(id: number): Promise<any>
    update(id: number, design: Design): Promise<any> 
    findByName(name: string): Promise<Design>
}