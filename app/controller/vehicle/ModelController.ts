import { model as ModelVehicle } from "../../entities/model";
import { Request, Response, NextFunction } from "express";
import ModelRepository from "../../repository/ModelRepository";
import BrandRepository from "../../repository/BrandRepository";
import { MyUtil } from "../../util/MyUtil";

export default class ModelController {
    private modelRepository: ModelRepository;
    private brandRepository: BrandRepository;

    constructor() {
        this.modelRepository = new ModelRepository();
        this.brandRepository = new BrandRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllModelVehicle ==> GET");

        await this.modelRepository.getAll().then((result) =>
            res.send({ code: "success", data: result ? result : {} })
        ).catch(err => MyUtil.handleError(err, res))

    };

    editModelVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editModelVehicle ==> PUT");

        var modelVehicle: ModelVehicle = new ModelVehicle();
        var id = req.body.model_id;

        modelVehicle = req.body;

        await this.modelRepository.update(id, modelVehicle).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };

    postModelVehicle = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received postModelVehicle ==> POST");

        let modelVehicle: ModelVehicle = new ModelVehicle();
        modelVehicle = req.body;

        var result = await this.modelRepository.create(modelVehicle).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });

    };

    getModelVehicleByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Model vehicle  by name==> GET");
        let modelName = req.query.model_name;

        var result = await this.modelRepository.findByName(modelName).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });
    }

    getModelVehicleById = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Model vehicle  by id==> GET");
        let id = req.query.model_id;

        var result = await this.modelRepository.getOne(id).catch(err => MyUtil.handleError(err, res)).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });
    }

    getByBrandName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Model vehicle  by name==> GET");
        let brandName = req.query.brand_name;

        let brand = await this.brandRepository.findByName(brandName).catch(err => MyUtil.handleError(err, res));
        if (brand) {
            let id = brand["brand_id"];
            req.query.brand_id = id;
            await this.getByBrandId(req, res, next).catch(err => MyUtil.handleError(err, res))
        } else {
            res.send({ code: "success", data: {} });
        }

    }

    getByBrandId = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Model vehicle  by brandId==> GET");
        let brandId = req.query.brand_id;

        var result = await this.modelRepository.findByBrandId(brandId).catch(err => MyUtil.handleError(err, res))

       MyUtil.handleSuccess(result, res)

    }

   
}