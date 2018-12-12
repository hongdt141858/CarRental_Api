import { image as Image} from "../entities/image";
import IImageRepository from "./irepository/IImageRepository";
import {Connection, Repository, getConnectionManager, In} from 'typeorm';


export default class ImageRepository implements IImageRepository {

    private imageRepo: Repository<Image>;
    constructor() {
        this.imageRepo =  getConnectionManager().get("car_rental").getRepository(Image);
    }

    public async getAll(): Promise<Array<Image>> {
        return await this.imageRepo.find();
    }

    public async getOne(id: number): Promise<Image> {
        return await this.imageRepo.findOne(id);
    }

    public async create(image: Image): Promise<Image> {
        return await this.imageRepo.save(image);
    }

    public async delete(id: number): Promise<Image> {
        let image = await this.getOne(id);
        await this.imageRepo.delete(id);
        return image;

    }
    public async update(id: number, image: Image): Promise<Image> {
        let imageUpdate = await this.imageRepo.update(id, image);
        return await this.getOne(id);
    }

    public async findByName(image_name: string): Promise<Image> {
        let image = await this.imageRepo.findOne({ "image_name": image_name })
        return image;
    }

    public async findByOption(option: any): Promise<any> {
        let image = await this.imageRepo.find(option)
        return image;   
    }
   
}