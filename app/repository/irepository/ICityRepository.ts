import { city as City } from "../../entities/city";

export default interface ICityRepository {
    getAll(): Promise<Array<City>>
    getOne(id: number): Promise<City>
    create(city: City):Promise<City>
    delete(id: number): Promise<any>
    update(id: number, city: City): Promise<any> 
    findByName(name: string): Promise<City>
}