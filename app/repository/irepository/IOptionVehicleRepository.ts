import { option_vehicle as OptionVehicle } from "../../entities/option_vehicle";


export default interface IOptionMapRepository {
    getAll(): Promise<Array<OptionVehicle>>
    getOne(id: number): Promise<OptionVehicle>
    create(optionVehicle: OptionVehicle):Promise<OptionVehicle>
    delete(id: number): Promise<OptionVehicle>
    update(id: number, optionVehicle: OptionVehicle): Promise<OptionVehicle> 
    findByVehicleId (vehicleId: number):Promise<OptionVehicle[]>
    findByOptionId(optionId:number):Promise<OptionVehicle>
    createList(list: OptionVehicle[]):Promise<OptionVehicle[]>
}