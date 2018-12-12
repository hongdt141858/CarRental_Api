import { holiday as Holiday} from "../entities/holiday";
import HolidayRepository from '../repository/HolidayRepository'
import { Request, Response, NextFunction } from "express";
import { MyUtil } from "../util/MyUtil";

export default class HolidayController {
    
    private holiRepository ;

    constructor(){
        this.holiRepository = new HolidayRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Holidays ==> GET");

        await this.holiRepository.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

   
}
