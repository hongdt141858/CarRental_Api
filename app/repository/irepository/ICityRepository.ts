import { city as City } from "../../entities/city";

export default interface ISeatRepository {
    getAll(): Promise<Array<City>>
    getOne(id: number): Promise<City>
    create(city: City):Promise<City>
    delete(id: number): Promise<City>
    update(id: number, city: City): Promise<City> 
    findByName(city_name: number): Promise<City>
}