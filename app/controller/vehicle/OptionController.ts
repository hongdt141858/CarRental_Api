import { option as Option } from "../../entities/option";
import { Request, Response, NextFunction } from "express";
import OptionRepository from "../../repository/OptionRepository";
import { MyUtil } from "../../util/MyUtil";

export default class OptionController {
    private optionRepository: OptionRepository;

    constructor() {
        this.optionRepository = new OptionRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllOption ==> GET");

        await this.optionRepository.getAll().then((result) =>
            res.send({ code: "success", data: result ? result : {} })
        ).catch(err => MyUtil.handleError(err, res))

    };

    editOption = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editOption ==> PUT");

        var option: Option = new Option();
        var id = req.body.option_id;

        option = req.body;

        await this.optionRepository.update(id, option).then((result) => {
            MyUtil.handleSuccess(result, res)
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };

    postOption = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received postOption ==> POST");

        let option: Option = new Option();
        option = req.body;
        var result = await this.optionRepository.create(option).then((result) => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))

    };

    getOptionByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get option vehicle  by name==> GET");
        let name = req.query.option_name;

        var result = await this.optionRepository.findByName(name).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });
    }

    getOptionById = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get option vehicle  by id==> GET");
        let id = req.query.option_id;
        var result = await this.optionRepository.getOne(id).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });
    }
}