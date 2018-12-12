import { weekday as Weekday} from "../entities/weekday";
import WeekdayRepository from '../repository/WeekdayRepository'
import { Request, Response, NextFunction } from "express";
import { MyUtil } from "../util/MyUtil";

export default class WeekdayController {
    
    private WeekdayRepository ;

    constructor(){
        this.WeekdayRepository = new WeekdayRepository();
    }
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Weekdays ==> GET");

        await this.WeekdayRepository.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));
    };

   
}
