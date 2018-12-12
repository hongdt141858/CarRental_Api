
import { design as DesignVehicle } from "../../entities/design";
import { Request, Response, NextFunction } from "express";
import DesignRepository from "../../repository/DesignRepository";
import { MyUtil } from "../../util/MyUtil";

export default class DesignController {
    private designRepository: DesignRepository;

    constructor() {
        this.designRepository = new DesignRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllDesignVehicle ==> GET");

        await this.designRepository.getAll().then((result) =>
            res.send({ code: "success", data: result ? result : {} })
        ).catch(err => MyUtil.handleError(err, res))

    };

    editDesignVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editDesignVehicle ==> PUT");

        var design: DesignVehicle = new DesignVehicle();
        var id = req.body.design_id;

        design = req.body;

        await this.designRepository.update(id, design).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };

    postDesignVehicle = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received postDesignVehicle ==> POST");

        let design: DesignVehicle = new DesignVehicle();
        design.design_name = req.body.design_name;

        var result = await this.designRepository.create(design).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });

    };

    getDesigneByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Design vehicle  by name==> GET");
        let name = req.query.design_name;

        var result = await this.designRepository.findByName(name).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });

    }

    getDesignById = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Design vehicle  by id==> GET");
        let id = req.query.design_id;

        var result = await this.designRepository.getOne(id).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });
    }



}