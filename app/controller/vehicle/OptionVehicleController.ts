import { option_vehicle as OptionVehicle } from "../../entities/option_vehicle";
import { Request, Response, NextFunction } from "express";
import OptionVehicleRepository from "../../repository/OptionVehicleRepository"
import { MyUtil } from "../../util/MyUtil";

export default class OptionVehicleControler {
    private optVehicleRepository: OptionVehicleRepository;

    constructor() {
        this.optVehicleRepository = new OptionVehicleRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllOptionVehicle ==> GET");

        await this.optVehicleRepository.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => MyUtil.handleError(err, res))

    };

    editOptionVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editOptionVehicle ==> PUT");

        var optionVehicle: OptionVehicle = new OptionVehicle();
        var id = req.body.option_vehicle_id;

        optionVehicle = req.body;

        await this.optVehicleRepository.update(id, optionVehicle).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };

    postOptionVehicle = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received postOptionVehicle ==> POST");

        let optionVehicle: OptionVehicle = new OptionVehicle();
        optionVehicle = req.body;

        var result = await this.optVehicleRepository.create(optionVehicle).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        })
            .catch(err => MyUtil.handleError(err, res))


    };

    getOptionVehicleByOpt = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get OptionVehicle vehicle  by opt id==> GET");
        let optionId = req.query.option_id;

        var result = await this.optVehicleRepository.findByOptionId(optionId).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? { "list": result[0], "count": result[1] } : {} });
    }

    getOptionVehicleById = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get OptionVehicle vehicle  by  id==> GET");
        let id = req.query.option_vehicle_id;

        var result = await this.optVehicleRepository.getOne(id).catch(err => MyUtil.handleError(err, res)).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? { "list": result[0], "count": result[1] } : {} });
    }


    getOptionVehicleByVehicle = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get OptionVehicle vehicle  by vehicle id==> GET");
        let vehicleId = req.query.vehicle_id;

        var result = await this.optVehicleRepository.findByVehicleId(vehicleId).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))


    }
}