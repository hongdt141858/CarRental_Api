import { booking } from "../../entities/booking";

export default class BookingReqDTO {
    private user_account_id: number;
    private customer_name: string;
    private customer_phone: string;
    private customer_email: string;
    private customer_delivery_address: string;
    private customer_delivery_lat: number;
    private customer_delivery_long: number;
    private vehicle_partner_id: number;
    private vehicle_partner_name: string;
    private booking_rental_date: string;
    private booking_return_date: string;
    private booking_delivery_form_id: number;
    private promotion_code: string;
    private booking_note: string;
    private booking_code: string;
    private booking_date_create: string;
    private booking_id: string;

    constructor(reqBody) {
        console.log("zzzzzzzzzzzzzzzzzzzzzzz",reqBody)
        this.user_account_id = reqBody.user_account_id;
        this.customer_name = reqBody.customer_name;
        this.customer_phone = reqBody.customer_phone;
        this.customer_email = reqBody.customer_email;
        this.customer_delivery_address = reqBody.customer_delivery_address;
        this.customer_delivery_lat = reqBody.customer_delivery_lat;
        this.customer_delivery_long = reqBody.customer_delivery_long;
        this.vehicle_partner_id = reqBody.vehicle_partner_id;
        this.vehicle_partner_name = reqBody.vehicle_partner_name;
        this.booking_rental_date = reqBody.booking_rental_date;
        this.booking_return_date = reqBody.booking_return_date;
        this.booking_delivery_form_id = reqBody.booking_deli_form_id;
        this.promotion_code = reqBody.promotion_code;
        this.booking_note = reqBody.booking_note;
        this.booking_code = reqBody["booking_code"] ? reqBody["booking_code"]:"";
        this.booking_id = reqBody["booking_id"] ? reqBody["booking_id"]:"";
        this.booking_date_create = reqBody["booking_date_create"] ? reqBody["booking_date_create"]:"";
    }
    getBookCode(){
        return this.booking_code;
    }

    getBookId(){
        return this.booking_id;
    }

    getBookCrta(){
        return this.booking_date_create;
    }

    getUseAccId(){
        return this.user_account_id
    }
    getCstmName(){
        return this.customer_name
    }
    getCstmPhon(){
        return this.customer_phone
    }
    getCstmEmai(){
        return this.customer_email
    }
    getCstmDeliAddr(){
        return this.customer_delivery_address
    }
    getCstmDeliAddrLat(){
        return this.customer_delivery_lat
    }
    getCstmDeliAddrLng(){
        return this.customer_delivery_long
    }
   
    getVhcPartId(){
        return this.vehicle_partner_id
    }
    getVhcPartName(){
        return this.vehicle_partner_name
    }
    getBookRentDate(){
     return this.booking_rental_date
    }
    getBookRetunDate(){
        return this.booking_return_date
    }
    getBookDeliFormId(){
        return this.booking_delivery_form_id
    }
    getPromoCode(){
        return this.promotion_code
    }

    getBookNote(){
        return this.booking_note
    }

    setBookNote(booking_note: string){
        this.booking_note = booking_note
    }

    setUseAccId(use_acc_id: number){
        this.user_account_id = use_acc_id
    }
    setCstmName(cstm_name: string){
        this.customer_name = cstm_name
    }
    setCstmPhon(cstm_phon: string){
        this.customer_phone = cstm_phon
    }
    setCstmEmai(cstm_emai: string){
        this.customer_email = cstm_emai
    }
    setCstmDeliAddr(cstm_deli_addr: string){
        this.customer_delivery_address = cstm_deli_addr
    }
    setCstmDeliAddrLat(cstm_deli_addr_lat: number){
        this.customer_delivery_lat = cstm_deli_addr_lat
    }
    setCstmDeliAddrLng(cstm_deli_addr_lng: number){
        this.customer_delivery_long = cstm_deli_addr_lng
    }
    setVhcPartId(vhc_part_id: number){
        this.vehicle_partner_id = vhc_part_id
    }
    setVhcPartName(vhc_part_name: string){
        this.vehicle_partner_name = vhc_part_name
    }
    setBookRentDate(booking_rent_date: string){
        this.booking_rental_date = booking_rent_date
    }
    setBookRetunDate(booking_retun_date: string){
        this.booking_return_date = booking_retun_date
    }
    setBookDeliFormId(booking_deli_form_id: number){
        this.booking_delivery_form_id = booking_deli_form_id
    }
    setPromoCode(promo_code: string){
        this.promotion_code = promo_code
    }
}