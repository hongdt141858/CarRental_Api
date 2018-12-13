import { Repository, getConnectionManager } from "typeorm";
import { promotion } from "../../entities/promotion";

export default class PromoRepository {
    private promoRepository: Repository<promotion>;
    constructor() {
        this.promoRepository = getConnectionManager().get("car_rental").getRepository(promotion);
    }

    public async getAll(){
        return await this.promoRepository.find();
    }

    public async getById(id: number){
        return await this.promoRepository.findOne(id)
    }

    public async getByCode(code: string){
        return await this.promoRepository.findOne({promotion_code: code})
    }
}