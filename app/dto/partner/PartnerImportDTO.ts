export default class PartnerReqDTO {

    private partner_id: number;
    private partner_name: string;
    private partner_phone: string;
    private partner_email: string;
    private partner_logo: string;
    private city_id: number;
    private city_name: string;
    private partner_lat: number;
    private partner_long: number;
    private partner_address: string;
    private partner_contact_name: string;
    private partner_contact_phone: string;
    private partner_payment_account: string;
    private partner_website: string;
    private partner_stat_time: string;
    private partner_end_time: string;
    private partner_support_night: boolean;
    private partner_over_time_fee: number;
    private partner_limit_km: number;
    private partner_over_km_fee: number;
    private partner_delivery_free_km: number;
    private partner_delivery_over_km_fee: number;
    private partner_policy: string;
    private partner_delivery_home: number;
    private date_create: Date;
    private date_update: Date;
    private partner_delete: Date;
    private procedure_names: string[];
    private weekdays: string[];
    private holidays: string[];

    constructor(arr) {
        if (arr[0])
            this.partner_id = arr[0]
        this.partner_name = arr[1];
        this.partner_phone = arr[3];
        this.partner_email = arr[4];
        this.partner_logo = arr[5];
        this.city_id = arr[6];
        this.city_name = arr[7]
        this.partner_lat = arr[8];
        this.partner_long = arr[9];
        this.partner_address = arr[10];
        this.partner_contact_name = arr[11]
        this.partner_contact_phone = arr[12]
        this.partner_payment_account = arr[13]
        this.partner_website = arr[14]
        this.partner_stat_time = arr[15] ? arr[15] : "00:00";
        this.partner_end_time = arr[16] ? arr[16] : "23:59";
        this.partner_support_night = arr[17] ? arr[17] : 1;
        this.partner_over_time_fee = arr[18];
        this.partner_limit_km = arr[19];
        this.partner_over_km_fee = arr[20];
        this.partner_delivery_free_km = arr[21];
        this.partner_delivery_over_km_fee = arr[22];
        this.partner_delivery_home = arr[23]
        this.partner_policy = arr[24];
        this.date_create = arr[25];
        this.date_update = arr[26];
        this.partner_delete = arr[27];
        this.procedure_names = arr[29];
        this.weekdays = arr[30];
        this.holidays = arr[31];
    
    }

    public getPartName(): string {
        return this.partner_name;
    }
    public setPartName(name: string): void {
        this.partner_name = name
    }

    public getPartPhon(): string {
        return this.partner_phone
    }
    public setPartPhone(phone: string): void {
        this.partner_phone = phone
    }
    public getPartEmail(): string {
        return this.partner_email
    }
    public setPartEmail(email: string): void {
        this.partner_email = email
    }
    public getPartLogo(): string {
        return this.partner_logo;
    }
    public setPartLogo(logo: string): void {
        this.partner_logo = logo
    }
    public getCityId(): number {
        return this.city_id
    }
    public setCityId(city_id: number): void {
        this.city_id = city_id
    }
    public getCityName(): string {
        return this.city_name
    }
    public setCityName(city_name: string): void {
        this.city_name = city_name
    }
    public getPartAddress(): string {
        return this.partner_address
    }
    public setPartAddress(address: string) {
        this.partner_address = address
    }
    public getPartLat(): number {
        return this.partner_lat
    }
    public setPartLat(lat: number): void {
        this.partner_lat = lat
    }
    public getPartLong(): number {
        return this.partner_long
    }
    public setPartLong(long: number) {
        this.partner_long = long
    }
    public getPartContactName(): string {
        return this.partner_contact_name
    }
    public setPartContactName(Contact_name: string): void {
        this.partner_contact_name = Contact_name
    }
    public getPartContactPhone(): string {
        return this.partner_contact_phone
    }
    public setPartContactPhone(contact_phone: string) {
        this.partner_contact_phone = contact_phone
    }
    public getPartPaymentAccount(): string {
        return this.partner_payment_account
    }
    public setPartPaymentAccount(payment_account: string): void {
        this.partner_payment_account = payment_account
    }
    public getPartWebsite(): string {
        return this.partner_website
    }
    public setPartWebsite(web: string): void {
        this.partner_website = web
    }
    public getPartStatTime(): string {
        return this.partner_stat_time
    }
    public setPartStatTime(stat_time: string): void {
        this.partner_stat_time = stat_time
    }
    public getPartEndTime(): string {
        return this.partner_end_time
    }
    public setPartEndTime(end_time: string): void {
        this.partner_end_time = end_time
    }
    public getPartLastNighSupport(): boolean {
        return this.partner_support_night
    }
    public setPartLastNighSupport(partner_support_night: boolean): void {
        this.partner_support_night = partner_support_night
    }
    public getPartOverTimeFee(): number {
        return this.partner_over_time_fee
    }
    public setPartOverTimeFee(partner_over_time_fee: number): void {
        this.partner_over_time_fee = partner_over_time_fee
    }
    public getPartLimitKm(): number {
        return this.partner_limit_km
    }
    public setPartLimitKm(partner_limit_km: number) {
        this.partner_limit_km = partner_limit_km
    }
    public getPartOverKmFee(): number {
        return this.partner_over_km_fee
    }
    public setPartOverKmFee(partner_over_km_fee: number) {
        this.partner_over_km_fee = partner_over_km_fee
    }
    public getPartDeliveryFreeKm(): number {
        return this.partner_delivery_free_km
    }
    public setPartDeliveryFreeKm(partner_delivery_free_km: number) {
        this.partner_delivery_free_km = partner_delivery_free_km
    }
    public getPartDeliveryOverKmFee(): number {
        return this.partner_delivery_over_km_fee
    }
    public setPartDeliveryOverKmFee(partner_delivery_over_km_fee: number) {
        this.partner_delivery_over_km_fee = partner_delivery_over_km_fee
    }
    public getPartPolicy(): string {
        return this.partner_policy
    }
    public setPartPolicy(partner_policy: string) {
        this.partner_policy = partner_policy
    }
   
    public getProcedureNames(): string[] {
        return this.procedure_names
    }
    public setProcedureNames(procedure_names: string[]) {
        this.procedure_names = procedure_names
    }
    public getWeekdayIds(): string[] {
        return this.weekdays
    }
    public setWeekdayIds(weekdays: string[]) {
        this.weekdays = weekdays
    }
    public getHolidayIds(): string[] {
        return this.holidays
    }
    public setHolidayIds(holidays: string[]) {
        this.holidays = holidays
    }
    
    public getDeliHome(): number {
        return this.partner_delivery_home
    }
    public setDeliHome(partner_delivery_home: number) {
        this.partner_delivery_home = partner_delivery_home
    }

}