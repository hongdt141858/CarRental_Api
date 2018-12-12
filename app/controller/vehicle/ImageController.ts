import { image as ImageVehicle } from "../../entities/image";
import { Request, Response, NextFunction } from "express";
import ImageRepository from "../../repository/ImageRepository";
import { MyUtil } from "../../util/MyUtil";


export default class ImageVehicleControler {
    private imageRepository: ImageRepository;

    constructor() {
        this.imageRepository = new ImageRepository();
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received getAllImageVehicle ==> GET");

        await this.imageRepository.getAll().then((result) =>
            res.send({ code: "success", data: result ? result : {} })
        ).catch(err => MyUtil.handleError(err, res))

    };

    editImageVehicle = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Received editImageVehicle ==> PUT");

        var imageVehicle: ImageVehicle = new ImageVehicle();
        var id = req.body.image_id;

        imageVehicle = req.body;

        await this.imageRepository.update(id, imageVehicle).then((result) => {
            res.send({ code: "success", data: result ? result : {} })
        }).catch(err => MyUtil.handleError(err, res))
            ;

    };

    postImageVehicle = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received postImageVehicle ==> POST");

        let imageVehicle: ImageVehicle = new ImageVehicle();
        imageVehicle = req.body;

        var result = await this.imageRepository.create(imageVehicle).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });

    };

    // postListImageVehicle = async (req: Request, res: Response, next: NextFunction) => {

    //     console.log("Received postListImageVehicle ==> POST");

    //     let list: Array<ImageVehicle> = new Array<ImageVehicle>();
    //     list = req.body;

    //     var result = await this.imageRepository.createList(list).catch(err => MyUtil.handleError(err, res))
    //     MyUtil.handleSuccess(result, res)

    // };

    getImageVehicleById = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get ImageVehicle vehicle  by id==> GET");
        let imageVehicleId = req.query.image_id;

        var result = await this.imageRepository.getOne(imageVehicleId).catch(err => MyUtil.handleError(err, res))
        res.send({ code: "success", data: result ? result : {} });


    }

    getImageByVehicle = async (req: Request, res: Response, next: NextFunction) => {

        console.log("Received get ImageVehicle vehicle  by opt id==> GET");
        let image_id = req.query.image_id;

        var result = await this.imageRepository.getOne(image_id).catch(err => MyUtil.handleError(err, res)).catch(err => MyUtil.handleError(err, res))

        res.send({ code: "success", data: result ? result : {} });
    }


}