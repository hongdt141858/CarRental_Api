import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("booking_price_detail",{schema:"car_rental"})
export class booking_price_detail {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"booking_price_detail_id"
        })
    booking_price_detail_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"booking_id"
        })
    booking_id:number;
        

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
