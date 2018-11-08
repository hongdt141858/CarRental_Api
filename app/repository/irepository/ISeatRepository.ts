import { seat as Seat } from "../../entities/seat";

export default interface ISeatRepository {
    getAll(): Promise<Array<Seat>>
    getOne(id: number): Promise<Seat>
    create(seat: Seat):Promise<Seat>
    delete(id: number): Promise<Seat>
    update(id: number, seat: Seat): Promise<Seat> 
    findByName(seatNumber: number): Promise<Seat>
}