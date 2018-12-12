import{vehicle as Vehicle} from  '../../entities/vehicle'

export default interface IVehicleRepository{
    getAll(): Promise<Array<Vehicle>>
    getOne(id: number): Promise<Vehicle>
    create(vehicle: Vehicle):Promise<Vehicle>
    createList(list: Array<Vehicle>): Promise<Array<Vehicle>>
    delete(id: number): Promise<Vehicle>
    update(id: number, vehicle: Vehicle): Promise<Vehicle> 
    findByVehicleName(name: string): Promise<Vehicle>
    findByVehicleOption(option: any): Promise<any>
    findIn(arr: string[]): Promise<any>
    findByName(brand_name: string,model_name: string,vehicle_name: string): Promise<Vehicle>
}