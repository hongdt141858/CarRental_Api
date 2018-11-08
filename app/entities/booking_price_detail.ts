import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {booking} from "./booking";


@Entity("booking_price_detail",{schema:"car_rental"})
@Index("booking_id",["booking_",])
export class booking_price_detail {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"booking_price_detail_id"
        })
    booking_price_detail_id:number;
        

   
    @ManyToOne(type=>booking, booking=>booking.booking_price_details,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'booking_id'})
    booking_:booking | null;


    @Column("int",{ 
        nullable:false,
        name:"booking_price_type_id"
        })
    booking_price_type_id:number;
        

    @Column("int",{ 
        nullable:true,
        default:"0",
        name:"booking_price_quantity"
        })
    booking_price_quantity:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"unit_price"
        })
    unit_price:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"detail_price_total"
        })
    detail_price_total:number | null;
        
}
