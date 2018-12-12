import { procedure as Procedure } from "../entities/procedure";
import ProduceRepository from '../repository/ProcedureRepository'
import { Request, Response, NextFunction } from "express";
import { MyUtil } from "../util/MyUtil";

export default class ProcedureController {

    private procedureRepository;

    constructor() {
        this.procedureRepository = new ProduceRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all procedures ==> GET");

        await this.procedureRepository.getAll().then((result) => {
            console.log(result)
            MyUtil.handleSuccess(result, res)
        }
        ).catch(err => next(err));
    };


}
