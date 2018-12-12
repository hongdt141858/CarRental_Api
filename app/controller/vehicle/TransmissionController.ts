
import { transmission as TransmissionVehicle } from "../../entities/transmission";
import { Request, Response, NextFunction } from "express";

import TransmissionRepository from "../../repository/TransmissionRepository";
import { MyUtil } from "../../util/MyUtil";

export default class TransmissionController {
    private transRepository: TransmissionRepository;

    constructor() {
        this.transRepository = new TransmissionRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllTransmissionVehicle ==> GET");

        await this.transRepository.getAll().then((result) =>
            res.send({ code: "success", data: result ? result : {} })
        ).catch(err => MyUtil.handleError(err, res))

    };

    editTransmissionVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editTransmissionVehicle ==> PUT");

        var trans: TransmissionVehicle = new TransmissionVehicle();
        var id = req.body.transmission_id;

        trans = req.body;

        await this.transRepository.update(id, trans).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };

    postTransmissionVehicle = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received postTransmissionVehicle ==> POST");

        let transmission: TransmissionVehicle = new TransmissionVehicle();
        transmission= req.body;

        var result = await this.transRepository.create(transmission).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });

    };

    getTransmissioneByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Transmission vehicle  by name==> GET");
        let name = req.query.transmission_name;

        var result = await this.transRepository.findByName(name).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });

    }

    getTransmissionById = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Transmission vehicle  by id==> GET");
        let id = req.query.transmission_id;

        var result = await this.transRepository.getOne(id).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });
    }

}