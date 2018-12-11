import { Request, Response, NextFunction } from "express";
import CityRepository from "../repository/CityRepository";

import { city as City } from "../entities/city";
import { MyUtil } from "../util/MyUtil";

export default class PartnerController {
    private cityRepo: CityRepository;

    constructor() {
        this.cityRepo = new CityRepository()
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all cities ==> GET");

        await this.cityRepo.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };
}