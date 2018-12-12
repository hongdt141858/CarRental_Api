import { image as ImageVehicle } from "../../entities/image";

export default interface IImageRepository {
    getAll(): Promise<Array<ImageVehicle>>
    getOne(id: number): Promise<ImageVehicle>
    create(image: ImageVehicle):Promise<ImageVehicle>
    delete(id: number): Promise<any>
    update(id: number, image: ImageVehicle): Promise<any> 
    findByName(name: string): Promise<ImageVehicle>
    findByOption(option: any): Promise<any>
}