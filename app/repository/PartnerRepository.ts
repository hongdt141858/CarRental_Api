import { partner as Partner } from "../entities/partner"
import { Repository, getConnectionManager } from "typeorm";

export default class PartnerRepository {
    private partnerRepository: Repository<Partner>;
    constructor() {
        this.partnerRepository = getConnectionManager().get("car_renatl").getRepository(Partner);
    }

    public async getAll() {
        return await this.partnerRepository.find();
    }
    public async getOne(id: number) {
        return await this.partnerRepository.findOne({ "partner_id": id })
    }
    public async save(partner: Partner) {
        await this.partnerRepository.save(partner);
        return await this.findByName(partner.partner_name);
    }

    public async findByName(name: string) {
        return await this.partnerRepository.findOne({ "partner_name": name});
    }

    public async findByEmail(email: string) {
        return await this.partnerRepository.findOne({ "partner_email": email })
    }

    public async findByPhone(phone: string) {
        return await this.partnerRepository.findOne({ "partner_phone": phone });
    }

    public async findByOptions(options: any) {
        return await this.partnerRepository.find(options);
    }

}