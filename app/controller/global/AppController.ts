import { Request, Response, NextFunction } from "express";
import VehicleController from '../vehicle/VehicleController'
import { MyUtil } from "../../util/MyUtil";
import PartnerController from "../PartnerController";
import VehiclePartController from "../VehiclePartController";


export default class AppController {
    private vehicleController;
    private motoController;
    private vehiclePartController;
    private partnerController;

    constructor() {
        this.vehicleController = new VehicleController();
        this.partnerController = new PartnerController();
        this.vehiclePartController = new VehiclePartController();

    }

    public index = async (req: Request, res: Response) => {
        res.render('index.ejs');
    }
    public uploadVehicle = async (req: Request, res: Response, next: NextFunction) => {
        const key = 'https://docs.google.com/spreadsheets/d/1Gy3m5cn9KnfdJVRKqUvHauWFdgZwTWuLF007ppWskfU/edit#gid=1620732975'

        var result = await this.getExcel("vehicle", key);

        var vehicles = result
        var arr = Object.keys(result)

        for (let i = 1; i < arr.length; i++) {
            let data = vehicles[i]

            req.body = data;

            let a = await this.vehicleController.postVehicle(req, res);
            if (a)
                console.log("true")
        }
        MyUtil.handleSuccess({}, res);
    }
    getExcel = (name, keyGG) => {

        return new Promise(function (resolve) {
            var Tabletop = require('tabletop')
            Tabletop.init({
                key: keyGG,
                callback: (data, tabletop) => {

                    resolve(data[name].elements);
                },
                impleSheet: true
            })

        });

    }

    public uploadPartner = async (req: Request, res: Response, next: NextFunction) => {
        const key = "https://docs.google.com/spreadsheets/d/1mDIsSl1vAjDIiq2QJu260TVtL_v7KOk-wgShul94uwI/edit#gid=947527366"
        var result = await this.getExcel("partner", key);
        // console.log(result)y

        var partners = result
        var arr = Object.keys(result)
        for (let i = 1; i < arr.length; i++) {
            var partner = partners[i];
            Object.keys(partner).forEach((key) => {
                if (partner[key] == '' || !partner[key]) {
                    delete partner[key]
                }
            })
            req.body = partner
            await this.partnerController.postPartner(req, res);
        }
        MyUtil.handleSuccess({}, res);


    }

    public uploadVehiclePartner = async (req: Request, res: Response, next: NextFunction) => {
        const key = "https://docs.google.com/spreadsheets/d/1mDIsSl1vAjDIiq2QJu260TVtL_v7KOk-wgShul94uwI/edit#gid=947527366"
        var result = await this.getExcel("vehicle_partner", key);
        console.log(result)
        var arr = Object.keys(result)
        for (let i = 0; i < arr.length; i++) {
            var vehicle = result[i]
            Object.keys(vehicle).forEach((key) => {
                if (vehicle[key] == '' || !vehicle[key]) {
                    delete vehicle[key]
                }
            })
            req.body = vehicle
            await this.vehiclePartController.postVehicle(req, res);
        }
        MyUtil.handleSuccess({}, res);

    }

}