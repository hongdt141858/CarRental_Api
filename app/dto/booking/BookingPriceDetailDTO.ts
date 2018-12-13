import { booking_price_detail } from "../../entities/booking_price_detail";
import { booking_price_type } from "../../entities/booking_price_type";

export default class BookingPriceDetailDTO {
    private booking_price_detail_id: number;
    private booking_id: number;
    private booking_price_type: booking_price_type;
    private booking_price_quantity: number | null;
    private unit_price: number | null;
    private detail_price_total: number | null;

    constructor(priceDetail: booking_price_detail) {
        this.booking_price_detail_id = priceDetail.booking_price_detail_id;
        this.booking_id = priceDetail.booking_id;
        this.booking_price_type = new booking_price_type();
        this.booking_price_type.booking_price_type_id = priceDetail.booking_price_type_id;
        this.booking_price_quantity = priceDetail.booking_price_quantity;
        this.unit_price = priceDetail.unit_price;
        this.detail_price_total = priceDetail.detail_price_total;
    }

    public getBookpriceDtlId() {
        return this.booking_price_detail_id
    }

    public setBookpriceDtlId(booking_price_detail_id: number) {
        this.booking_price_detail_id = booking_price_detail_id
    }

    public getBookId() {
        return this.booking_id
    }

    public setBookId(booking_id: number) {
        this.booking_id = booking_id
    }

    public getBookpriceType() {
        return this.booking_price_type
    }

    public setBookpriceType(booking_price_type: booking_price_type) {
        this.booking_price_type = booking_price_type
    }

    public getpriceTypequantity() {
        return this.booking_price_quantity
    }

    public setpriceTypequantity(price_type_quantity: number) {
        this.booking_price_quantity = price_type_quantity
    }

    public getUnitprice() {
        return this.unit_price
    }

    public setUnitprice(unit_price: number) {
        this.unit_price = unit_price
    }

    public getdetailpricetotal() {
        return this.detail_price_total
    }

    public setdetailpricetotal(detail_price_total: number) {
        this.detail_price_total = detail_price_total
    }

}