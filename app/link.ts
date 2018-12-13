/*
thành phố :
    get_all: /city
số ghế:
    get_all: /seat
động cơ:
    get_all: /transmission
hãng:
    get_all: /brand
list xe:
    *chi tiet xe: /vehicle-partner/get-detail-vehicle-partner
                params: vehicle_partner_id
    *list xe: /vehicle-partner
                params :  brand-id ,seat-id, transmission_id, price_from, price_to, city_id


*/