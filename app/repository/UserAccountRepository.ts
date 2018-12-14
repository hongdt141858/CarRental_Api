import { user_account as UserAccount } from "../entities/user_account";
import { Repository, getConnectionManager} from 'typeorm';

export default class UserAccountRepository  {

    private userRepo: Repository<UserAccount>;
    
    constructor() {
        this.userRepo = getConnectionManager().get("car_rental").getRepository(UserAccount);
    
    }

    public async getAll(): Promise<Array<UserAccount>> {
        return await this.userRepo.find();
    }

    public async getOne(id: number): Promise<UserAccount> {
        return await this.userRepo.findOne(id);
    }

    public async create(userAccount: UserAccount): Promise<UserAccount> {
        return await this.userRepo.save(userAccount);
    }

    public async delete(id: number): Promise<UserAccount> {
        let user = await this.getOne(id);
        await this.userRepo.delete(id);
        return user;

    }
    public async update(id: number, userAccount: UserAccount): Promise<UserAccount> {
        await this.userRepo.update(id, userAccount);
        return await this.getOne(id);
    }

    public async findByUserName(username: string): Promise<UserAccount> {
        let user = await this.userRepo.findOne({ "user_account_name": username })
        return user;
    }

    public async findByEmail(email: string): Promise<UserAccount> {
        let user = await this.userRepo.findOne({ "user_account_email": email})
        return user;
    }

    public async findByPhone(phone: string): Promise<UserAccount> {
        let user = await this.userRepo.findOne({ "user_account_phone": phone})
        return user;
    }

    public async findByToken(token: string) :Promise<UserAccount> {
        return await this.userRepo.findOne({user_account_token: token})
    }

}