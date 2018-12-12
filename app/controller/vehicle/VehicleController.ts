
import { vehicle as Vehicle } from "../../entities/vehicle";
import { option_vehicle as OptionVehicle } from '../../entities/option_vehicle'
import { image as ImageVehicle } from '../../entities/image'
import { Request, Response, NextFunction } from "express";
import VehicleRepository from "../../repository/VehicleRepository";
import OptionVehicleRepository from "../../repository/OptionVehicleRepository";
import ImageRepository from "../../repository/ImageRepository";
import OptionRepository from "../../repository/OptionRepository";
import BrandRepository from "../../repository/BrandRepository"
import TransissionRepository from "../../repository/TransmissionRepository"
import DesignRepository from "../../repository/DesignRepository"
import FuelRepository from "../../repository/FuelRepository"
import ModelRepository from "../../repository/ModelRepository"
import SeatRepository from "../../repository/SeatRepository"
import { MyUtil } from "../../util/MyUtil";
import { HandleCheck } from "../../util/HandleCheck";

export default class VehicleController {
    private vehicleRepository: VehicleRepository;
    private optionRepository: OptionRepository;
    private optVehicleRepository: OptionVehicleRepository;
    private imageRepository: ImageRepository;
    private brandRepository: BrandRepository;
    private transissionRepository: TransissionRepository;
    private designRepository: DesignRepository;
    private fuelRepository: FuelRepository;
    private modelRepository: ModelRepository;
    private seatRepository: SeatRepository

    constructor() {
        this.vehicleRepository = new VehicleRepository();
        this.optionRepository = new OptionRepository();
        this.optVehicleRepository = new OptionVehicleRepository();
        this.imageRepository = new ImageRepository();
        this.brandRepository = new BrandRepository();
        this.transissionRepository = new TransissionRepository();
        this.designRepository = new DesignRepository();
        this.fuelRepository = new FuelRepository();
        this.modelRepository = new ModelRepository();
        this.seatRepository = new SeatRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllVehicle ==> GET");

        await this.vehicleRepository.getAll().then((result) =>
            res.send({ code: "success", data: result ? result : {} })
        ).catch(err => MyUtil.handleError(err, res))

    };

    editVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editVehicle ==> PUT");
        var vehicle: Vehicle = new Vehicle();
        var id = req.body.vehicle_id;
        vehicle = req.body;

        await this.vehicleRepository.update(id, vehicle).then((result) => {
            MyUtil.handleSuccess(result, res)
        }).catch(err => MyUtil.handleError(err, res));

    };

    postVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received postVehicle ==> POST");

        console.log(req.url)
        let checkVehicle, checkOptions = [];
        checkOptions[0] = true
        let vehicle: Vehicle = new Vehicle(), optionVehicles: Array<OptionVehicle> = new Array<OptionVehicle>();
        let check = await this.convertDataVehicle(req, res);

        if (!check) {
            MyUtil.handleError({ "message": "Data not true" }, res);
            return;
        }

        vehicle = check[0]
        let vehicle_images = check[1]
        let vehicle_options = check[2]

        let result;

        checkVehicle = await this.vehicleRepository.findByName(vehicle.brand_name, vehicle.model_name,vehicle.vehicle_name).catch(err => MyUtil.handleError(err, res))

        if (checkVehicle) {
            checkVehicle = false
            let err = { "message": "vehicle is already exist" };
            MyUtil.handleError(err, res);
            return
        }
        else {
            if (vehicle_options !== undefined && vehicle_options.trim().toString() != null) {
                checkOptions = await this.getOptionsFromVehicle(vehicle_options, res, optionVehicles);
            }

            if (checkOptions[0]) {
                result = await this.vehicleRepository.create(vehicle).catch(err => MyUtil.handleError(err, res))

                let vehicle_id = result ? result.vehicle_id : 0;
                optionVehicles = checkOptions[1] ? checkOptions[1] : []
                optionVehicles.map(function (optVehicle) {
                    optVehicle.vehicle_id = vehicle_id;
                    return optVehicle;
                })

                if (result) {
                    if (vehicle_options != undefined && vehicle_options.trim() != "") {
                        // console.log(optionVehicles)
                        for (let i = 0; i < optionVehicles.length; i++)
                            await this.optVehicleRepository.create(optionVehicles[i]).catch(err => MyUtil.handleError(err, res));
                    }

                    if (vehicle_images != undefined && vehicle_images.trim() != "") {
                        await this.postListImageVehicle(vehicle_images, result, res).catch(err => MyUtil.handleError(err, res));
                    }
                }

                return result;

            }
        }
    };



    postCar = async (req: Request, res: Response, next: NextFunction) => {
        var result = await this.postVehicle(req, res, next);
        MyUtil.handleSuccess(result, res)
    }

    deleteVehicle = async (vehicle_id) => {
    }

    convertDataVehicle = async (req, res) => {
        let checkOptions = [], checkBrand, checkType, checkTransisssion, checkFuel, checkModel, checkDesign, checkSeat;
        checkOptions[0] = true
        let vehicle: Vehicle = new Vehicle();

        let data = req.body;
        
        if (!(data && data["vehicle_name"] && data["brand_name"] && data["model_name"]
            && data["fuel_name"] && data["seat_number"]) && data["transmission_name"] && data["design_name"]) {
                console.log(data)
                MyUtil.handleError({ message: "data is not true" }, res)
            return false
        }

        let vehicle_images = req.body.vehicle_images, vehicle_options = req.body.vehicle_options;
        let engin_number = req.body.engin_number;

        // console.log(data)
        checkBrand = await HandleCheck.checkOptionVehicle(this.brandRepository,data["brand_name"])
        checkDesign = await HandleCheck.checkOptionVehicle(this.designRepository, data["design_name"])
        checkFuel = await HandleCheck.checkOption(this.fuelRepository, MyUtil.slug(data["fuel_name"]))
        checkModel = await HandleCheck.checkOptionVehicle(this.modelRepository, data["model_name"])
        checkSeat = await HandleCheck.checkOptionVehicle(this.seatRepository, data["seat_number"])
        checkTransisssion = await HandleCheck.checkOption(this.transissionRepository, MyUtil.slug(data["transmission_name"]))

        if (!checkBrand || !checkDesign || !checkFuel || !checkModel || !checkTransisssion || !checkSeat) {
            MyUtil.handleError({ message: "data is not true" }, res)
            console.log(checkBrand, checkDesign, checkFuel, checkModel, checkTransisssion, checkSeat)
            return false;
        }
        data["brand_id"] = checkBrand["brand_id"]
        data["brand_name"] = checkBrand["brand_name"]
        data["seat_id"] = checkSeat["seat_id"]
        data["seat_number"] = checkSeat["seat_number"]
        data["model_id"] = checkModel["model_id"]
        data["model_name"] = checkModel["model_name"]
        data["transmission_id"] = checkTransisssion["transmission_id"]
        data["transmission_name"] = checkTransisssion["transmission_name"]
        data["design_id"] = checkDesign["design_id"]
        data["design_name"] = checkDesign["design_name"]
        data["fuel_id"] = checkFuel["fuel_id"]
        data["fuel_name"] = checkFuel["fuel_name"]


        delete data["vehicle_options"];
        delete data["vehicle_images"]

        vehicle = data;
        vehicle["engin_number"] = parseFloat(engin_number);
        return [vehicle, vehicle_images, vehicle_options]
    }

    postListImageVehicle = async (images: string, vehicle, res: Response) => {
        let list;
        if (images !== undefined && images.trim() != "") {
            list = MyUtil.trimArray(images, ",");
        }

        var slug = JSON.stringify(vehicle.vehicle_name)

        let arr: Array<ImageVehicle> = new Array<ImageVehicle>();
        if (list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i]) {
                    let imageVehicle = new ImageVehicle();
                    imageVehicle.image_link = list[i];
                    imageVehicle.image_name = MyUtil.slug(slug + " " + i);
                    imageVehicle.vehicle_id = vehicle.vehicle_id;
                    imageVehicle.table_name = "vehicle"
                    arr.push(imageVehicle)
                }

            }
            await this.imageRepository.createList(arr).catch((error) => MyUtil.handleError(error, res));
        }

    }

    getOptionsFromVehicle = async (options: string, res: Response, optionVehicles: Array<OptionVehicle>) => {
        let list = MyUtil.trimArray(options, ",");
        let checkOptions = true;

        for (var i = 0; i < list.length; i++) {
            let option = await this.optionRepository.findByName(list[i]).catch(err => MyUtil.handleError(err, res))
            let optionVehicle = new OptionVehicle();
            if (option) {
                optionVehicle.option_id = option ? option.option_id : null;
                optionVehicles.push(optionVehicle)
            } else {
                checkOptions = false;
                let err = { "message": "option " + list[i] + " không tồn tại" };
                MyUtil.handleError(err, res);
            }

        }
        return [checkOptions, optionVehicles];
    }

    postListVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle vehicle  by name==> GET");
        let list = new Array<Vehicle>();
        list = req.body;
        var result = await this.vehicleRepository.createList(list).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);

    }

    getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle vehicle  by id==> GET");
        let vehicle_id = req.query.vehicle_id;

        let result = await this.getDetailVehicle(vehicle_id).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }
    getOne = async (vehicle_id) => {
        return await this.vehicleRepository.getOne(vehicle_id)
    }

    getVehicleByName = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get Vehicle vehicle  by name==> GET");
        let id = req.query.vehicle_name;

        var result = await this.vehicleRepository.findByVehicleName(id).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }

    getVehicleOption = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle vehicle  by option==> GET");
        let option = req.query;
        var result = await this.vehicleRepository.findByVehicleOption(option).catch(err => MyUtil.handleError(err, res))

        MyUtil.handleSuccess(result, res);
    }

    getDetailVehicle = async (vehicle_id: number) => {
        let vehicle;

        if (vehicle_id) {
            let vehicle_images, vehicle_options;
            vehicle = await this.vehicleRepository.getOne(vehicle_id).catch(err => MyUtil.handleErrorFunction(err))
            let optionIds = [];
            await this.optVehicleRepository.findByVehicleId(vehicle_id)
                .catch(err => MyUtil.handleErrorFunction(err))
                .then(result => {
                    let length = result ? result.length : 0;
                    for (let i = 0; i < length; i++) {
                        optionIds[i] = result[i].vehicle_opt_id;
                    }

                })
            if (optionIds.length > 0) {
                await this.optionRepository.findIds(optionIds).then(result => {
                    if (result) {
                        vehicle["vehicle_options"] = result
                    };
                })
            }

            await this.imageRepository.findByImageTable("vehicle", vehicle_id).catch(err => MyUtil.handleErrorFunction(err))
                .then(result => {
                    vehicle_images = result;
                })
            if (vehicle_images) {
                vehicle["vehicle_images"] = vehicle_images
            }

            return vehicle;

        } else {
            let err = { message: "vehicle_id not exits" }
            MyUtil.handleErrorFunction(err)
        }
    }

}