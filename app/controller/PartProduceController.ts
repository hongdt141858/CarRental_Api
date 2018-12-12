import { partner_procedure as PartnerProduce} from "../entities/partner_procedure";
import PartProcedureRepository from '../repository/PartProcedureRepository'
import { Request, Response, NextFunction } from "express";
import { MyUtil } from "../util/MyUtil";

export default class PartProcController {
    
    private partProcedureRepository ;

    constructor(){
        this.partProcedureRepository = new PartProcedureRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Holidays ==> GET");

        await this.partProcedureRepository.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

    public deleteByPartId = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received delete Produce by Part id ==> DELETE");

        console.log(req.body, req.query)
        var partner_id = parseInt(req.query.partner_id);
        await this.partProcedureRepository.deleteByPartId(partner_id).then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

   
}
