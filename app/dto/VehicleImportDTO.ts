
// export default class VehicleImportDTO {

//     private vehicle_id?: number
//     private vehicle_name: string
//     private brand_id: number
//     private brand_name: string
//     private model_id: number
//     private model_name: string
//     private engin_number: number
//     private transmission_id: number
//     private transmission_name: string
//     private seat_id: number
//     private seat_number: string
//     private vehicle_fuel_id: number
//     private vehicle_fuel_name: string
//     private vehicle_fuel_csum_num: string
//     private design_id: number
//     private design_name: string
//     private date_create: Date
//     private date_update?: Date
//     private vehicle_options: string
//     private vehicle_images: string

//     constructor(arr) {
//         if (arr[0])
//             this.vehicle_id = arr[0]        
//         this.brand_name = arr[3]
//         this.brand_id = arr[4]
//         this.model_name = arr[5]
//         this.model_id = arr[6]
//         this.vehicle_name = arr[7]
//         this.engin_number = parseFloat(arr[8])
//         this.transmission_id = arr[9]
//         this.transmission_name = arr[10]
//         this.seat_id = arr[11]
//         this.seat_number = arr[12]
//         this.vehicle_fuel_id = arr[13]
//         this.vehicle_fuel_name = arr[14]
//         this.vehicle_fuel_csum_num = arr[15]
//         this.design_id = arr[16]
//         this.design_name = arr[17]
//         this.vehicle_des = arr[18]
//         this.vehicle_polc = arr[19]
//         this.vehicle_prty = arr[20]
//         this.vehicle_hide = arr[21]
//         this.date_create = arr[22] ? arr[22] : null
//         this.date_update = arr[23] ? arr[23] : null
//         this.vehicle_del = arr[24] ? arr[24] : null
//         this.vehicle_options = arr[26]
//         this.vehicle_images = arr[25]
//     }


//     get getId(): number {
//         return this.vehicle_id;
//     }

//     get getName(): string {
//         return this.vehicle_name;
//     }



// }


