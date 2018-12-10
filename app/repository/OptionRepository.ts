import { option as Option } from "../entities/option";
import IOptionRepository from "./irepository/IOptionRepository";
import {Connection, Repository, getConnectionManager, In} from 'typeorm';

export default class OptionRepository  implements IOptionRepository {

    private optionRepo: Repository<Option>;
    constructor() {
        this.optionRepo = getConnectionManager().get("car_rental").getRepository(Option);
    }

    public async getAll(): Promise<Array<Option>> {
        return await this.optionRepo.find();
    }

    public async getOne(id: number): Promise<Option> {
        return await this.optionRepo.findOne(id);
    }

    public async create(option: Option): Promise<Option> {
        return await this.optionRepo.save(option);
    }

    public async createList(list: Option[]): Promise<Option[]> {
        return await this.optionRepo.save(list);
    }

    public async delete(id: number): Promise<Option> {
        let option = await this.getOne(id);
        await this.optionRepo.delete(id);
        return option;

    }
    public async update(id: number, option: Option): Promise<Option> {
        let optionUpdate = await this.optionRepo.update(id, option);
        return await this.getOne(id);
    }

    public async findByName(name: string): Promise<Option> {
        return await this.optionRepo.findOne({ "option_name": name })
    }

}