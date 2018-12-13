import { user_account as UserAccount } from "../../entities/user_account";

export default interface IUserAccountService {
    getAll(): Promise<Array<UserAccount>>
    getOne(id: number): Promise<UserAccount>
    getUserByToken(token: string): Promise<UserAccount>
    register(userAccount: UserAccount):Promise<UserAccount>
    delete(id: number): Promise<UserAccount>
    update(token: string, userAccount: UserAccount): Promise<UserAccount>
    findByEmail(email: string): Promise<UserAccount>
    findByPhone(phone: any): Promise<UserAccount>
    findByUsername(username: string) : Promise<UserAccount>
    login( username: string, password: string): Promise<UserAccount>
    logout(token: string): Promise<UserAccount>;
    changePassword(token: string, data: object): Promise<UserAccount>
}


