import { seat as SeatVehicle } from "../../entities/seat";
import { Request, Response, NextFunction } from "express";

import SeatRepository from "../../repository/SeatRepository";
import { MyUtil } from "../../util/MyUtil";

export default class SeatController {
    private seatRepository: SeatRepository;

    constructor() {
        this.seatRepository = new SeatRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllSeatVehicle ==> GET");

        await this.seatRepository.getAll().then((result) =>
            res.send({ code: "success", data: result ? result : {} })
        ).catch(err => MyUtil.handleError(err, res))

    };

    editSeatVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editSeatVehicle ==> PUT");

        var seatVehicle: SeatVehicle = new SeatVehicle();
        var id = req.body.seat_id;

        seatVehicle = req.body;

        await this.seatRepository.update(id, seatVehicle).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };

    postSeatVehicle = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received postSeatVehicle ==> POST");

        let seat: SeatVehicle = new SeatVehicle();
        seat = req.body;

        var result = await this.seatRepository.create(seat).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });

    };

    getSeateByNumber = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Seat vehicle  by name==> GET");
        let number = req.query.seat_number;

        var result = await this.seatRepository.findByName(number).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });
    }

    getSeatById = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Seat vehicle  by id==> GET");
        let id = req.query.seat_id;
        var result = await this.seatRepository.getOne(id).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });
    }
}