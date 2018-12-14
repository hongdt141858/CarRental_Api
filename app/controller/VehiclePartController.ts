
import { vehicle_partner as VehiclePartner } from "../entities/vehicle_partner";
import { Request, Response, NextFunction } from "express";
import VehiclePartRepository from "../repository/VehiclePartRepository";
import VehicleRepository from "../repository/VehicleRepository"
import ImageRepository from "../repository/ImageRepository"
import VehicleController from "./vehicle/VehicleController"
import PartnerController from "./PartnerController"
import PartnerRepository from "../repository/PartnerRepository"
import { MyUtil } from "../util/MyUtil";
import { partner } from "../entities/partner";

export default class VehiclePartController {
    private vehicleRepository: VehicleRepository;
    private partnerRepository: PartnerRepository;
    private vehiclePartRepository: VehiclePartRepository;
    private vehicleController: VehicleController;
    private partnerController: PartnerController;
    private imageRepository: ImageRepository


    constructor() {
        this.vehicleRepository = new VehicleRepository();
        this.vehiclePartRepository = new VehiclePartRepository();
        this.partnerRepository = new PartnerRepository();
        this.vehicleController = new VehicleController();
        this.partnerController = new PartnerController();
        this.imageRepository = new ImageRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllVehicle ==> GET");

        await this.vehiclePartRepository.getAll()
            .then(result => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res))

    };

    deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received delete vehicle partner ==> PUT");
        var id = req.body.vehicle_partner_id;

        await this.vehiclePartRepository.delete(id).then((result) => MyUtil.handleSuccess(result, res))
            .catch(err => MyUtil.handleError(err, res));

    }

    editVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received EDIT vehicle partner ==> PUT")
        var check, vehicle_partner_id, end = false;
        if (!req.body) {
            MyUtil.handleError({ message: "Data is not null" }, res)
            return;
        }
        vehicle_partner_id = req.body["vehicle_partner_id"]
        let vehicle: VehiclePartner = new VehiclePartner();
        check = await this.handleCheckVehiclePartner(req.body, res).catch(err => MyUtil.handleError(err, res))
        if (check) {
            vehicle = check;
            var result;
            if (vehicle.vehicle_id) {
                result = await this.vehiclePartRepository.update(vehicle_partner_id, vehicle).catch(err => { MyUtil.handleError(err, res); end = true })
                if (end)
                    return;
                MyUtil.handleSuccess(result, res)
                return;
            }

        }
        return;
    };

    handleCheckVehiclePartner = async (value, res) => {
        console.log(value)
        let checkVehicle;
        var end = false;
        let vehicle: VehiclePartner = new VehiclePartner();

        let data = value;
        let brand_name = value["brand_name"];
        let model_name = value["model_name"];
        let vehicle_partner_name;
        let vehicle_name = value["vehicle_name"];

        vehicle_partner_name = brand_name + " " + model_name + " " + vehicle_name + " " + value["vehicle_partner_year"];
        data["vehicle_partner_name"] = vehicle_partner_name;
        data["vehicle_partner_slug"] = MyUtil.slug(vehicle_partner_name);

        delete data["brand_id"]
        vehicle = data;
        console.log(vehicle, "??????????????????????????????????")
        let obj = { "vehicle_partner_name": vehicle_partner_name, "partner_id": value["partner_id"] }

        checkVehicle = await this.vehiclePartRepository.findByVehicleOption(obj).catch(err => {
            MyUtil.handleError(err, res);
            end = true
        })
        if (end) return false;

        if (checkVehicle && checkVehicle.length > 0) {
            checkVehicle = false
            let err = { "message": vehicle_partner_name + " already exist" };
            MyUtil.handleError(err, res);
            end = true;
        }
        else {
            console.log(vehicle["vehicle_id"], "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            if (!vehicle["vehicle_id"])
                console.log(vehicle["vehicle_id"], "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            await this.vehicleRepository.findIdByName(brand_name, model_name, vehicle_name)
                .then((result) => {
                    console.log(result, "#######################")
                    vehicle.vehicle_id = result ? result.vehicle_id : null
                })
                .catch((err) => { MyUtil.handleError(err, res); end = true })

        }

        if (end) return false;
        return vehicle;

    }

    postVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received postVehiclePartner ==> POST");
        let checkVehicle;
        var check;
        let vehicle: VehiclePartner = new VehiclePartner();
        check = await this.handleCheckVehiclePartner(req.body, res).catch(err => MyUtil.handleError(err, res))
        if (check) {
            vehicle = check;
            var result;
            if (vehicle.vehicle_id) {
                result = await this.vehiclePartRepository.create(vehicle).catch(err => MyUtil.handleError(err, res))
                // MyUtil.handleSuccess(result, res)
                return;
            }

        }
    };

    postListVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle partner  by name==> GET");
        let list = new Array<VehiclePartner>();
        let checkVehicle, check = true;
        if (req.body) {
            list = req.body;
            for (let i = 0; i < list.length; i++) {
                let item = list[i];

                let vehicle: VehiclePartner = new VehiclePartner();
                let name = item.vehicle_partner_name + "";
                vehicle = item;
                checkVehicle = await this.vehicleRepository.findByVehicleOption({ "vehicle_partner_name": name, "partner_id": item.partner_id }).catch(err => MyUtil.handleError(err, res))
                if (checkVehicle) {
                    checkVehicle = false
                    let err = { "message": "vehicle_partner_name already exist" };
                    MyUtil.handleError(err, res);
                    check = false;
                    break;
                }
            }
            if (check) {
                var result = await this.vehiclePartRepository.createList(list).catch(err => MyUtil.handleError(err, res))
                MyUtil.handleSuccess(result, res)
            } else
                MyUtil.handleSuccess(result, res);
        }
        else {
            var err = { message: "Data none" }
            MyUtil.handleError(err, res)
        }

    }

    getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle partner  by id==> GET");
        let id = req.query.vehicle_partner_id;

        var result = await this.vehiclePartRepository.getOne(id).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }

    getVehicleByName = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle partner  by name==> GET");
        let id = req.query.vehicle_partner_name;

        var result = await this.vehiclePartRepository.findByVehicleName(id).catch(err => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }

    getVehicleOption = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received get Vehicle partner  by option==> GET");
        let option = req.query;

        var result = await this.vehiclePartRepository.findByVehicleOption(option).catch(err => MyUtil.handleError(err, res))

        MyUtil.handleSuccess(result, res);
    }

    getListVehicles = async (req: Request, res: Response, next: NextFunction) => {
        let params = req.query;
        let url = req.originalUrl;
        if (params) {
            let vehicles, partners, vehiclePartners, listVehicle = [];
            let vehicleIds = [], partnerIds = []
            let option1 = {}, option2 = {}

            let vehicle_partner_hide = 0;
            if (params["vehicle_partner_hide"])
                vehicle_partner_hide = params.vehicle_partner_hide;


            option2["date_delete"] = null;
            if (params.brand_id && params.brand_id != 0) {
                option1["brand_id"] = Number.parseInt(params.brand_id)
            }

            if (params.seat_id && params.seat_id != 0) {
                option1["seat_id"] = params.seat_id
            }

            if (params.transmission_id && params.transmission_id != 0) {
                option1["transmission_id"] = Number.parseInt(params.transmission_id)
            }

            if (params.city_id) {
                option2["city_id"] = params.city_id;
            }
            console.log(option1, option2)
            vehicles = await this.vehicleRepository.findByVehicleOption(option1).catch((err) => MyUtil.handleError({ "message": "error find vehicle option" }, res))
            console.log(vehicle)
            if (vehicles) {
                for (let i = 0; i < vehicles.length; i++) {
                    vehicleIds.push(vehicles[i]["vehicle_id"])
                }
            }

            partners = await this.partnerRepository.findByOptions(option2).catch((err) => MyUtil.handleError(err, res))
            //    console.log(partners)
            if (partners) {
                for (let i = 0; i < partners.length; i++) {
                    partnerIds.push(partners[i]["partner_id"])
                }
            }

            vehiclePartners = await this.vehiclePartRepository.findVehicles(vehicleIds, partnerIds, params.price_from, params.price_to, vehicle_partner_hide).catch(err => MyUtil.handleError(err, res))

            if (vehiclePartners[1] > 0) {

                let list = vehiclePartners[0]
                for (let i = 0; i < vehiclePartners[1]; i++) {
                    var vehicle;

                    vehicle = await this.getDetailVehicleShort(list[i].vehicle_partner_id, res).catch((err) => MyUtil.handleError(err, res))

                    if (vehicle)
                        listVehicle.push(vehicle)
                }
            }
            MyUtil.handleSuccess(listVehicle, res)
        } else {
            MyUtil.handleError({ message: "No params request" }, res);
        }
    }

    getAllVehiclePartner = async (req: Request, res: Response, next: NextFunction) => {
    }

    getDetailVehicleParter = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Get detail vehicle")
        let vehicle_partner_id = req.query.vehicle_partner_id;
        console.log(vehicle_partner_id)
        let result = await this.getDetailVehicle(vehicle_partner_id).catch((err) => MyUtil.handleError(err, res))
        MyUtil.handleSuccess(result, res);
    }

    getDetailVehicleShort = async (vehicle_partner_id: number, res: Response) => {
        let vehicle_id, partner_id, vehicle, partner;
        let vehiclePartner = {}

        if (vehicle_partner_id) {
            let result = await this.vehiclePartRepository.getOne(vehicle_partner_id).catch((err) => MyUtil.handleError(err, res))
            if (result) {
                vehicle_id = result.vehicle_id;
                partner_id = result.partner_id;
                var vehicle_images;
                partner = await this.partnerRepository.getOne(partner_id).catch((err) => MyUtil.handleErrorFunction(err))
                vehicle = await this.vehicleRepository.getOne(vehicle_id).catch((err) => MyUtil.handleErrorFunction(err))
                await this.imageRepository.findByImageTable("vehicle", vehicle_id).catch(err => MyUtil.handleErrorFunction(err))
                    .then(result => {
                        vehicle_images = result;
                    })
                if (vehicle_images) {
                    vehicle["vehicle_images"] = vehicle_images
                }
                if (vehicle) {
                    vehiclePartner["vehicle"] = vehicle;
                    vehiclePartner["partner"] = partner;
                    vehiclePartner = Object.assign(vehiclePartner, result)
                    vehiclePartner["vehicle_partner_star"] = 4;
                }
            }
        }
        return vehiclePartner;
    }

    getDetailVehicle = async (vehicle_partner_id: number) => {
        let vehicle_id, partner_id, vehicle, partner;
        let vehiclePartner = {}

        if (vehicle_partner_id) {
            let result = await this.vehiclePartRepository.getOne(vehicle_partner_id).catch((err) => MyUtil.handleErrorFunction(err))
            if (result) {
                vehicle_id = result.vehicle_id;
                partner_id = result.partner_id;
                vehicle = await this.vehicleController.getDetailVehicle(vehicle_id).catch((err) => MyUtil.handleErrorFunction(err))
                partner = await this.partnerController.getDetailPartner(partner_id).catch((err) => MyUtil.handleErrorFunction(err))

                if (vehicle && partner) {
                    vehiclePartner["vehicle"] = vehicle;
                    vehiclePartner["partner"] = partner;
                    vehiclePartner = Object.assign(vehiclePartner, result)
                    vehiclePartner["vehicle_partner_star"] = 4;
                }
            }
        }
        return vehiclePartner;
    }

}