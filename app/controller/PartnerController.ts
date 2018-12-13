import { Request, Response, NextFunction } from "express";
import PartnerRepository from "../repository/PartnerRepository";
import CityRepository from "../repository/CityRepository";
import HolidayRepository from "../repository/HolidayRepository";
import WeekdayRepository from "../repository/WeekdayRepository";
import ProcedureRepository from "../repository/ProcedureRepository";
import PartWeekdayRepository from "../repository/PartWeekdayRepository";
import PartProcedureRepository from "../repository/PartProcedureRepository";
import PartHolidayRepository from "../repository/PartHolidayRepository"
import { partner as Partner } from "../entities/partner"
import { weekday as WeekDay } from "../entities/weekday"
import { partner_weekday as PartWeekDay } from "../entities/partner_weekday"
import { holiday as Holiday } from "../entities/holiday"
import { partner_holiday as PartHoliday } from "../entities/partner_holiday"
import { procedure as Procedure } from "../entities/procedure"
import { partner_procedure as PartProcedure } from "../entities/partner_procedure"
import { MyUtil } from "../util/MyUtil";
import { partner } from "../../output/entities/partner";

export default class PartnerController {
    private partnerRepository: PartnerRepository;
    private weekdayRepository: WeekdayRepository;
    private partWeekdayRepository: PartWeekdayRepository;
    private procedureRepository: ProcedureRepository;
    private partProcedureRepository: PartProcedureRepository;
    private holidayRepository: HolidayRepository;
    private partHolidayRepository: PartHolidayRepository;
    private cityRepository: CityRepository;

    constructor() {
        this.partnerRepository = new PartnerRepository();
        this.cityRepository = new CityRepository();
        this.weekdayRepository = new WeekdayRepository();
        this.partWeekdayRepository = new PartWeekdayRepository();
        this.procedureRepository = new ProcedureRepository();
        this.partProcedureRepository = new PartProcedureRepository();
        this.holidayRepository = new HolidayRepository();
        this.partHolidayRepository = new PartHolidayRepository();

    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get all Partners ==> GET");

        await this.partnerRepository.getAll().then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };

    public getPartnerOptions = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get  Partners options==> GET");
        var options = req.query;
        await this.partnerRepository.findByOptions(options).then((result) =>
            MyUtil.handleSuccess(result, res)
        ).catch(err => next(err));

    };

    public postPartner = async (req: Request, res: Response) => {
        console.log("create a new partner ==> POST");
        var body = req.body;
        // console.log(partner)
        let holidays = body["holidays"];
        let weekdays = body["weekdays"];
        let procedure_names = body["procedure_names"];

        if (!(body && (body.city_id || body.city_name) && body.partner_name && body.partner_phone))
            MyUtil.handleError({ message: "No data!" }, res);
        else {
            let partner = new Partner();
            let weekdayPart = new Array<PartWeekDay>();
            let procedurePartner = new Array<PartProcedure>();
            let holidayPart = new Array<PartHoliday>();

            let check1, check2, check3, check = true;
            console.log(holidays)
            if (holidays)
            console.log("aaaaaaaaaaaaaaaaaaaaa")
                await this.getPartHolidays(body.holidays, res, holidayPart)
                    .catch((err) => {
                        
                        check = false
                        console.log(err )
                        MyUtil.handleError(err, res)
                    })
                    .then((result) => check1 = result);
            if (!check)
                console.log("aaaaaaaaaaaaaaaaaaaa")
            if (weekdays)
                await this.getPartWeekdays(weekdays, res, weekdayPart)
                    .catch((err) => {
                        MyUtil.handleError(err, res)
                        check = false
                    })
                    .then((result) => {
                        check2 = result
                    });
            if (procedure_names)
                await this.getProcedurePart(procedure_names, res, procedurePartner)
                    .catch((err) => {
                        MyUtil.handleError(err, res)
                        check = false
                    })
                    .then((result) => check3 = result);

            delete body["weekdays"]
            delete body["procedure_names"]
            delete body["holidays"]
            if (body["date_create"])
                body = Object.assign(body, { "date_create": new Date() })
            partner = body;
            let checkPartner = true;

            if (check) {
                if (!partner["partner_id"])
                    await this.partnerRepository.findByName(partner.partner_name)
                        .catch(err => MyUtil.handleError(err, res))
                        .then((result) => { if (result) checkPartner = false });
                if (!checkPartner) {
                    let err = { "message": "partner_name already exist" };
                    MyUtil.handleError(err, res);
                } else {
                    var end = false
                    let partner_id;
                    if(partner_id == 9||partner_id == 10)
                        console.log(partner)
                    await this.partnerRepository.save(partner)
                        .then((result) => { partner_id = result.partner_id; })
                        .catch(err => { console.log(partner); MyUtil.handleError(err, res); end = true ; })
                    if (end)
                        return;

                    if (partner_id) {
                        if (check1) {
                            this.setPartId(holidayPart, partner_id);
                            await this.partHolidayRepository.createList(holidayPart).catch((err) => MyUtil.handleError(err, res));
                        }
                        if (check2) {
                            this.setPartId(weekdayPart, partner_id);
                            await this.partWeekdayRepository.createList(weekdayPart).catch((err) => MyUtil.handleError(err, res))
                        }
                        if (check3) {
                            this.setPartId(procedurePartner, partner_id);
                            await this.partProcedureRepository.createList(procedurePartner).catch((err) => MyUtil.handleError(err, res))
                        }

                    } else {
                        let err = { "message": "error" };
                        MyUtil.handleError(err, res);
                    }
                }
            } else
                return MyUtil.handleError({ message: "error" }, res)

        }
    }

    setPartId = (obj: any[], partner_id: number) => {
        obj.map(function (item) {
            item.partner_id = partner_id;
            return item;
        })
    }

    getPartWeekdays = async (str: string, res: Response, weekdayPart: Array<PartWeekDay>) => {
        let arr;
        let check = true;

        if (str != undefined) {
            arr = MyUtil.convertListMap(str);

            for (var i = 0; i < arr.length; i++) {
                let item = arr[i]
                let name = (item[0] + "").toString().trim();
                let option = await this.weekdayRepository.findByName(name).catch(err => MyUtil.handleError(err, res))
                let weekday = new PartWeekDay();

                if (option) {
                    weekday.weekday_id = option ? option.weekday_id : null;
                    weekday.weekday_extra_fee = item[1];
                    weekdayPart.push(weekday)
                } else {
                    check = false;
                    let err = { "message": "Weekday " + item[0] + " không tồn tại" };
                    MyUtil.handleError(err, res);
                }

            }
        }
        return check;
    }


    getPartHolidays = async (str: string, res: Response, result: Array<PartHoliday>) => {
        let arr;
        let check = true;
        if (str && str !== undefined) {
            arr = MyUtil.convertListMap(str.trim());

            for (var i = 0; i < arr.length; i++) {
                let item = arr[i]
                console.log(item)
                let name = (item[0] + "").trim();
                let option = await this.holidayRepository.findByName(name).catch(err => MyUtil.handleError(err, res))
                let partHoliday = new PartHoliday();
                let holi = new Holiday();
                if (option) {
                    partHoliday.holiday_id = option ? option["holiday_id"] : null;
                    partHoliday.partner_extra_fee = item[1];
                    result.push(partHoliday)
                } else {
                    check = false;
                    let err = { "message": "holiday " + item[0] + " not exist" };
                    MyUtil.handleError(err, res);
                }

            }
        }
        return check;
    }
    getProcedurePart = async (str: string, res: Response, result: Array<PartProcedure>) => {
        let arr, check = true;

        if (str && str !== "" && str !== undefined) {
            arr = MyUtil.convertListMap(str);
            check = true;

            for (var i = 0; i < arr.length; i++) {
                let item = arr[i]
                let name = (item[0] + "").toString().trim();

                let option = await this.procedureRepository.findBySlug(MyUtil.slug(name.trim())).catch(err => MyUtil.handleError(err, res))
                let procedure = new PartProcedure();

                if (option) {
                    procedure.procedure_id = option ? option.procedure_id : null;
                    if (item.length > 1)
                        procedure.procedure_description = item[1];
                    result.push(procedure)
                } else {
                    check = false;
                    let err = { "message": "procedure " + item[0] + " not exist" };
                    MyUtil.handleError(err, res);
                }

            }
        }
        return check;
    }

    getDetailPartner = async (partner_id: number) => {
        let partner;

        if (partner_id) {
            let partner_procedures = [], partner_weekdays = [], partner_holidays = [];
            let procedureIds = [], weekdayIds = [], holidayIds = []
            let procedures, holidays, weekdays
            partner = await this.partnerRepository.getOne(partner_id).catch(err => MyUtil.handleErrorFunction(err))
            await this.partProcedureRepository.findByPartId(partner_id)
                .catch(err => MyUtil.handleErrorFunction(err))
                .then(result => {
                    let length = result ? result.length : 0;
                    for (let i = 0; i < length; i++) {
                        procedureIds.push(result[i].procedure_id);

                    }
                    procedures = result

                })
            for (let i = 0; i < procedureIds.length; i++) {
                await this.procedureRepository.getOne(procedureIds[i]).then(result => {
                    if (result) {
                        let procedure = {};
                        procedure["partner_procedure_id"] = procedures[i].partner_procedure_id;
                        procedure["procedure"] = result
                        procedure["procedure_description"] = procedures[i].procedure_description;
                        partner_procedures.push(procedure)
                    };
                })
            }
            partner["partner_procedures"] = partner_procedures;


            //Weekday
            await this.partWeekdayRepository.findByPartId(partner_id)
                .catch(err => MyUtil.handleErrorFunction(err))
                .then(result => {
                    let length = result ? result.length : 0;
                    for (let i = 0; i < length; i++) {
                        weekdayIds.push(result[i].Weekday_id);

                    }
                    weekdays = result

                })
            for (let i = 0; i < weekdayIds.length; i++) {
                await this.weekdayRepository.getOne(weekdayIds[i]).then(result => {
                    if (result) {
                        let weekday = {};
                        weekday["partner_weekday_id"] = weekdays[i].partner_weekday_id;
                        weekday["weekday"] = result
                        weekday["weekday_extra_fee"] = weekdays[i].weekday_extra_fee;
                        partner_weekdays.push(weekday)


                    };
                })
                    .catch(err => MyUtil.handleErrorFunction(err))
            }
            partner["partner_weekdays"] = partner_weekdays;

            //holidays
            await this.partHolidayRepository.findByPartId(partner_id)
                .catch(err => MyUtil.handleErrorFunction(err))
                .then(result => {
                    let length = result ? result.length : 0;
                    for (let i = 0; i < length; i++) {
                        holidayIds.push(result[i].holiday_id);

                    }
                    holidays = result

                })
            for (let i = 0; i < holidayIds.length; i++) {
                await this.holidayRepository.getOne(holidayIds[i]).then(result => {
                    if (result) {
                        let holiday = {};
                        holiday["partner_holiday_id"] = holidays[i].partner_holiday_id;
                        holiday["holiday"] = result
                        holiday["partner_extra_fee"] = holidays[i].partner_extra_fee;
                        partner_holidays.push(holiday)
                    };
                }).catch(err => MyUtil.handleErrorFunction(err))
            }
            partner["partner_holidays"] = partner_holidays;



        } else {
            let err = { message: "vhc_id not exits" }
            MyUtil.handleErrorFunction(err)
        }
        return partner;
    }

}