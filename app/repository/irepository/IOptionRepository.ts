import { option as Option } from "../../entities/option";
import { create } from "domain";

export default interface IOptionRepository {
    getAll(): Promise<Array<Option>>
    getOne(id: number): Promise<Option>
    create(option: Option):Promise<Option>
    delete(id: number): Promise<Option>
    update(id: number, option: Option): Promise<Option> 
    findByName(name: string): Promise<Option>
}