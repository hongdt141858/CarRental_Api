import IUserAccountService from "./IUserAccountService";
import UserAccountRepository from "../../repository/UserAccountRepository";
import { user_account as UserAccount } from "../../entities/user_account";
import { MyUtil } from "../../util/MyUtil";
import { Utils } from "../../util/Validate";


export default class UserAccountService implements IUserAccountService {

    private userRepo: UserAccountRepository;

    constructor() {
        this.userRepo = new UserAccountRepository();
    }

    public async getAll(): Promise<Array<UserAccount>> {
        return await this.userRepo.getAll();
    }

    public async getOne(id: number): Promise<UserAccount> {
        if (id <= 0 || (!id)) throw new Error("User's id is not true!")
        return await this.userRepo.getOne(id);
    }

    public async getUserByToken(token: string): Promise<UserAccount> {
        if (!token) throw new Error("Token is invalid!");
        var user = new UserAccount();
        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not existed!");
        var id = MyUtil.getUserIdByToken(token);
        if (id <= 0 || (!id) || (user.user_account_id !== id)) throw new Error("Token is not true!")
        return user;
    }

    public async register(user: UserAccount): Promise<UserAccount> {
        console.log("//////////////", user)
        if (!user) throw new Error("User is not null!")
        if (user.user_account_name) {
            if (!Utils.checkUsername(user.user_account_name)) throw new Error("Username is not true format")
            else await this.userRepo.findByUserName(user.user_account_name)
                .then(data => {
                    if (data) throw new Error("User is existed!!")
                })
                .catch(err => { throw new Error(err) })
        }

        if (user.user_account_email) {
            if (!Utils.isEmailAddress(user.user_account_email)) throw new Error("Email is not true format")
            else await this.userRepo.findByEmail(user.user_account_email)
                .then(data => {
                    if (data) throw new Error("User is existed!!");
                })
                .catch(err => { throw new Error(err) })
        }

        if (user.user_account_phone) {
            if (!Utils.isPhoneNumber(user.user_account_phone)) throw new Error("Phone is not true format")
            else await this.userRepo.findByPhone(user.user_account_phone)
                .then(data => {
                    if (data) throw new Error("User is existed!!");
                })
                .catch(err => { throw new Error(err) })
        }

        if (user.user_account_password && Utils.checkPassword(user.user_account_password)) {
            user.user_account_password = MyUtil.getHashPass(user.user_account_password);
        } else throw new Error("Password is not true format")

        if ((!user.user_account_name) && user.user_account_phone) user.user_account_name = user.user_account_phone;
        else if ((!user.user_account_name) && (!user.user_account_phone) && user.user_account_email) user.user_account_name = user.user_account_email;

        user.user_account_create = new Date();

        var result = null;
        await this.userRepo.create(user)
            .then(data => result = data)
            .catch(err => { throw new Error(err) })

        console.log(result);
        if (!result) throw new Error("Error creating a new user")

        result.user_account_token = MyUtil.getToken(result);
        await this.userRepo.update(result.user_account_id, result)
            .then(data => result = data)
            .catch(err => { throw new Error(err) })

        return result;
    }

    public async delete(id: number): Promise<UserAccount> {
        return await this.userRepo.delete(id);
    }

    public async update(token: string, userAccount: UserAccount): Promise<UserAccount> {
        var user = new UserAccount();
        if (!token) throw new Error("Token is invalid!!");

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not true");

        var id = MyUtil.getUserIdByToken(token);
        if ((!id) || (id <= 0) || (user.user_account_id !== id)) throw new Error("Token is not true!");

        userAccount.user_account_id = id;
        var check = false;
        var isPhone = false;

        if (user.user_account_name === user.user_account_phone) isPhone = true;
        if (user.user_account_name === user.user_account_email) isPhone = false;

        if (userAccount.user_account_phone) {
            if (!Utils.isPhoneNumber(userAccount.user_account_phone)) throw new Error("Phone number is not format!")
            let user1 = new UserAccount();
            await this.userRepo.findByPhone(userAccount.user_account_phone)
                .then(data => user1 = data)
                .catch(err => console.log(err))
            if (!user1) check = check && true;
            else {
                if (user1.user_account_phone === user.user_account_phone) check = check && true;
                else throw new Error("Phone number is existed!!")
            }
            if (isPhone || userAccount.user_account_phone) userAccount.user_account_name = userAccount.user_account_phone;
        }

        if (userAccount.user_account_email) {
            if (!Utils.isEmailAddress(userAccount.user_account_email)) throw new Error("Email is not format!");
            let user1 = new UserAccount();
            await this.userRepo.findByEmail(userAccount.user_account_email)
                .then(data => user1 = data)
                .catch(err => console.log(err))
            if (!user1) check = check && true;
            else {
                if (user1.user_account_email === user.user_account_email) check = check && true;
                else throw new Error("Email is existed!!")
            }
            if (!isPhone && (!userAccount.user_account_phone)) userAccount.user_account_name = userAccount.user_account_email;
        }

        if (userAccount.user_account_password) {
            if (!Utils.checkPassword(userAccount.user_account_password)) throw new Error("Password is not true format");
            userAccount.user_account_password = MyUtil.getHashPass(userAccount.user_account_password);
        }
        userAccount.user_account_token = MyUtil.getToken(userAccount)
        userAccount.user_account_update = new Date();
        console.log("user account: ", userAccount);
        return await this.userRepo.update(id, userAccount);
    }

    public async changePassword(token: string, data: object) {
        if ((!token) || (!data) || (!data["old_pass"]) || (!data["new_pass"])) throw new Error("Bạn chưa nhập đủ thông tin!");
        var user = new UserAccount();

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not existed!");

        var user_acc_id = MyUtil.getUserIdByToken(token);
        if (!user_acc_id || (user_acc_id <= 0) || (user.user_account_id !== user_acc_id)) throw new Error("Token is not true!");

        if (!MyUtil.checkPass(data["old_pass"], user.user_account_password)) throw new Error("Mật khẩu không đúng!")

        if (Utils.checkPassword(data["new_pass"])) {
            user.user_account_password = MyUtil.getHashPass(data["new_pass"]);
        } else throw new Error("Password is not true format")

        user.user_account_token = MyUtil.getToken(user);
        user.user_account_update = new Date();
        var result = null;
        await this.userRepo.update(user.user_account_id, user)
            .then(data => result = data)
            .catch(err => console.log(err))
        if (result) return result
        else throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!")
    }

    public async findByUsername(username: string): Promise<UserAccount> {
        return await this.userRepo.findByUserName(username);
    }

    public async findByEmail(email: string): Promise<UserAccount> {
        return await this.userRepo.findByEmail(email);
    }

    public async findByPhone(phone: any): Promise<UserAccount> {
        return await this.userRepo.findByPhone(phone);
    }

    public async login(username: string, password: string): Promise<UserAccount> {

        if (!username || !password) throw new Error("Data is not enough!");

        let check = 0;

        if (Utils.isEmailAddress(username)) {
            check = 1;
        } else if (Utils.isPhoneNumber(username)) {
            check = 2;
        }

        if (check == 0) throw new Error("Email or phone is not true!")
        else {
            let user = new UserAccount();
            await this.userRepo.findByUserName(username)
                .then(data => user = data)
                .catch(err => console.log(err))
            if (!user) {
                if (check == 1) {
                    await this.userRepo.findByEmail(username)
                        .then(data => user = data)
                        .catch(err => console.log(err))
                } else if (check == 2) {
                    await this.userRepo.findByPhone(username)
                        .then(data => user = data)
                        .catch(err => console.log(err))
                }
            }
            console.log("user: ", user);
            if (!user) throw new Error("Email or phone is not true!")

            let checkPassword = MyUtil.checkPass(password, user.user_account_password);
            console.log("checkPassword", checkPassword)
            if (!checkPassword) throw new Error("Password is not true!");

            user.user_account_token = MyUtil.getToken(user);
            user.user_account_last_login = new Date();
            user.user_account_update = new Date();
            await this.userRepo.update(user.user_account_id, user)
                .then(data => user = data)
                .catch(err => { throw new Error(err) })
            return user
        }
    }

    public async logout(token: string): Promise<UserAccount> {
        var user = new UserAccount();
        if (!token) throw new Error("Token is invalid!!");

        await this.userRepo.findByToken(token)
            .then(data => user = data)
            .catch(err => console.log(err))
        if (!user) throw new Error("Token is not existed");

        var id = MyUtil.getUserIdByToken(token);
        if (!id || (id <= 0) || (user.user_account_id !== id)) throw new Error("Token is not true!");

        user.user_account_token = "";
        user.user_account_update = new Date();
        await this.userRepo.update(user.user_account_id, user)
            .then(data => user = data)
            .catch(err => { throw new Error(err) })
        return user
    }
}