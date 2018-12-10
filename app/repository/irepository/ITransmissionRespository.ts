import { transmission as Transmission } from "../../entities/transmission";

export default interface ITransmissionRepository {
    getAll(): Promise<Array<Transmission>>
    getOne(id: number): Promise<Transmission>
    create(transmission: Transmission):Promise<Transmission>
    delete(id: number): Promise<Transmission>
    update(id: number, transmission: Transmission): Promise<Transmission> 
    findByName(name: string): Promise<Transmission>
}