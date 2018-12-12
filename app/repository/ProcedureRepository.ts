import {procedure as Procedure} from "../entities/procedure"
import { Repository, getConnectionManager } from "typeorm";

export default class ProcedureRepository {
    private proceRepo: Repository<Procedure>;
    constructor() {
        this.proceRepo = getConnectionManager().get("car_rental").getRepository(Procedure);
    }

    public async getAll() {
        return await this.proceRepo.find();
    }
    public async getOne(id: number){
        return await this.proceRepo.findOne({"procedure_id": id})
    }
    public async create(proc: Procedure){
        return await this.proceRepo.save(proc);
    }

    public async findByName(name: string){
        return await this.proceRepo.findOne({"procedure_name": name});
    }
    
    public async findBySlug(slug: string){
        return await this.proceRepo.findOne({"procedure_slug": slug});
    }
    
}