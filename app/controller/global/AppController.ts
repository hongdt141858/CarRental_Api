import { Request, Response, NextFunction } from "express";
import VehicleController from '../vehicle/VehicleController'
import { MyUtil } from "../../util/MyUtil";


export default class AppController {
    private vehicleController;
    private motoController;
    private vehiclePartController;
    private partnerController;

    constructor() {
        this.vehicleController = new VehicleController();

    }

    public index = async (req: Request, res: Response) => {
        res.render('index.ejs');
    }
    public uploadVehicle = async (req: Request, res: Response, next: NextFunction) => {

        var result = await this.getExcel();

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
    getExcel = () => {

        return new Promise(function (resolve) {
            var Tabletop = require('tabletop')
            Tabletop.init({
                key: 'https://docs.google.com/spreadsheets/d/1Gy3m5cn9KnfdJVRKqUvHauWFdgZwTWuLF007ppWskfU/edit#gid=1620732975',
                callback: (data, tabletop) => {
                    resolve(data.vehicle.elements);
                },
                impleSheet: true
            })

        });

    }

    // public uploadPartner = async (req: Request, res: Response, next: NextFunction) => {
    //     if (!req.file.path) {
    //         var err = { message: "Open File Error" }
    //         res.send((err) => MyUtil.handleError(err, res))
    //     } else {
    //         var arr = await MyUtil.readFileExcell(req.file.path + "", 1);
    //         let partners = MyUtil.convertPartner(arr)
    //         for (let i = 0; i < partners.length; i++) {     
    //             req.body = partners[i]
    //             await this.partnerController.postPartner(req, res);
    //         }
    //         MyUtil.handleSuccess({}, res);

    //     }
    // }

    // public uploadMoto = async (req: Request, res: Response, next: NextFunction) => {
    //     if (!req.file.path) {
    //         var err = { message: "Open File Error" }
    //         res.send((err) => MyUtil.handleError(err, res))
    //     } else {
    //         var arr = await MyUtil.readFileExcell(req.file.path + "", 1);
    //         let vehicles = MyUtil.convertMoto(arr)
    //         for (let i = 0; i < vehicles.length; i++) {

    //             let data = vehicles[i].moto
    //             req.body = data;
    //             await this.motoController.postVehicle(req, res);
    //         }
    //         MyUtil.handleSuccess({}, res);

    //     }
    // }

    // public uploadVehiclePartner = async (req: Request, res: Response, next: NextFunction) => {
    //     if (!req.file.path) {
    //         var err = { message: "Open File Error" }
    //         res.send((err) => MyUtil.handleError(err, res))
    //     } else {
    //         var arr = await MyUtil.readFileExcell(req.file.path + "", 1);
    //         let vehicles = MyUtil.convertVehiclePart(arr)
    //         for (let i = 0; i < vehicles.length; i++) {     
    //             req.body = vehicles[i]
    //             await this.vehiclePartController.postVehicle(req, res);
    //         }
    //         MyUtil.handleSuccess({}, res);

    //     }
    // }

    // public uploadPartner = async (req: Request, res: Response, next: NextFunction) => {
    //     if (!req.file.path) {
    //         var err = { message: "Open File Error" }
    //         res.send((err) => MyUtil.handleError(err, res))
    //     } else {
    //         var arr = await MyUtil.readFileExcell(req.file.path + "", 1);
    //         let partners = MyUtil.convertPartner(arr)
    //         for (let i = 0; i < partners.length; i++) {     
    //             req.body = partners[i]
    //             await this.partnerController.postPartner(req, res);
    //         }
    //         MyUtil.handleSuccess({}, res);

    //     }
    // }

}