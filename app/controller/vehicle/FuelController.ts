
import { fuel as FuelVehicle } from "../../entities/fuel";
import { Request, Response, NextFunction } from "express";

import FuelRepository from "../../repository/FuelRepository";
import { MyUtil } from "../../util/MyUtil";

export default class fuelController {
    private fuelRepository: FuelRepository;

    constructor() {
        this.fuelRepository = new FuelRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllFuelVehicle ==> GET");

        await this.fuelRepository.getAll().then((result) =>
            res.send({ code: "success", data: result ? result : {} })
        ).catch(err => MyUtil.handleError(err, res))

    };

    editFuelVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editFuelVehicle ==> PUT");

        var fuel: FuelVehicle = new FuelVehicle();
        var id = req.body.fuel_id;

        fuel = req.body;

        await this.fuelRepository.update(id, fuel).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };

    postFuelVehicle = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received postFuelVehicle ==> POST");

        let fuel: FuelVehicle = new FuelVehicle();
        fuel = req.body;

        var result = await this.fuelRepository.create(fuel).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });

    };

    getFueleByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get fuel vehicle  by name==> GET");
        let name = req.query.fuel_name;

        var result = await this.fuelRepository.findByName(name).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });

    }

    getFuelById = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get fuel vehicle  by id==> GET");
        let id = req.query.fuel_id;

        var result = await this.fuelRepository.getOne(id).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });
    }



}