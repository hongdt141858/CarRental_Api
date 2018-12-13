import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("booking",{schema:"car_rental"})
@Index("booking_code_UNIQUE",["booking_code",],{unique:true})
export class booking {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"booking_id"
        })
    booking_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        unique: true,
        length:255,
        name:"booking_code"
        })
    booking_code:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"user_account_id"
        })
    user_account_id:number | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"customer_name"
        })
    customer_name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"customer_phone"
        })
    customer_phone:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"customer_email"
        })
    customer_email:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"customer_delivery_address"
        })
    customer_delivery_address:string | null;
        

    @Column("float",{ 
        nullable:true,
        precision:12,
        name:"customer_delivery_lat"
        })
    customer_delivery_lat:number | null;
        

    @Column("float",{ 
        nullable:true,
        precision:12,
        name:"customer_delivery_long"
        })
    customer_delivery_long:number | null;
        

    @Column("int",{ 
        nullable:false,
        name:"vehicle_partner_id"
        })
    vehicle_partner_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"vehicle_partner_name"
        })
    vehicle_partner_name:string;
        

    @Column("int",{ 
        nullable:false,
        name:"partner_id"
        })
    partner_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"partner_name"
        })
    partner_name:string;
        

    @Column("int",{ 
        nullable:false,
        name:"city_id"
        })
    city_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"city_name"
        })
    city_name:string | null;
        

    @Column("timestamp",{ 
        nullable:false,
        default:"CURRENT_TIMESTAMP",
        name:"booking_rental_date"
        })
    booking_rental_date:Date;
        

    @Column("timestamp",{ 
        nullable:false,
        default:"0000-00-00 00:00:00",
        name:"booking_return_date"
        })
    booking_return_date:Date;
        

    @Column("int",{ 
        nullable:true,
        name:"booking_day_number"
        })
    booking_day_number:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"booking_extra_hour"
        })
    booking_extra_hour:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"booking_weekday_number"
        })
    booking_weekday_number:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"booking_holiday_number"
        })
    booking_holiday_number:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"booking_deli_form_id"
        })
    booking_deli_form_id:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"promotion_code"
        })
    promotion_code:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"promotion_value"
        })
    promotion_value:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"booking_status_id"
        })
    booking_status_id:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"booking_price_total"
        })
    booking_price_total:number | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"booking_date_create"
        })
    booking_date_create:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"booking_date_update"
        })
    booking_date_update:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"booking_date_delete"
        })
    booking_date_delete:Date | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"booking_note"
        })
    booking_note:string | null;
        
}
