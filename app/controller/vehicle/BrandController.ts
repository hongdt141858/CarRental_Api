 import { brand as Brand } from "../../entities/brand";
import { Request, Response, NextFunction } from "express";
import BrandRepository from "../../repository/BrandRepository";
import IBrandRepository from "../../repository/irepository/IBrandRepository";
import { MyUtil } from "../../util/MyUtil";

export default class BrandController {
    private brandRepo: IBrandRepository;

    constructor() {
        this.brandRepo = new BrandRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAll Brand ==> GET");

        await this.brandRepo.getAll()
            .then((result) => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))

    };

    editBrandVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editBrandVehicle ==> PUT");

        var brandVehicle: Brand = new Brand();
        var id = req.body.brand_id;

        brandVehicle = req.body;

        await this.brandRepo.update(id, brandVehicle)
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res));
    };

    postBrandVehicle = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received postBrandVehicle ==> POST");

        let brandVehicle: Brand = new Brand();
        brandVehicle = req.body;

        await this.brandRepo.create(brandVehicle)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    };

    getBrandVehicleByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Brand vehicle  by name==> GET");
        let brandname = req.query.brand_name;

        await this.brandRepo.findByName(brandname)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }

    getBrandVehicleById = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Brand vehicle  by name==> GET");
        let id = req.query.brand_id;

        await this.brandRepo.getOne(id)
            .then(data => MyUtil.handleSuccess(data, res))
            .catch(err => MyUtil.handleError(err, res))
    }
}