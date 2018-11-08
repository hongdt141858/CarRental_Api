import { seat as SeatVehicle } from "../../entities/seat";

export default interface ISeatRepository {
    getAll(): Promise<Array<SeatVehicle>>
    getOne(id: number): Promise<SeatVehicle>
    create(seat: SeatVehicle):Promise<SeatVehicle>
    delete(id: number): Promise<SeatVehicle>
    update(id: number, seat: SeatVehicle): Promise<SeatVehicle> 
    findByName(seatNumber: number): Promise<SeatVehicle>
}