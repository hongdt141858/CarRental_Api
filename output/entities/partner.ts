import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {city} from "./city";


@Entity("partner",{schema:"car_rental"})
@Index("partner_name_UNIQUE",["partner_name",],{unique:true})
@Index("partner_phone_UNIQUE",["partner_phone",],{unique:true})
@Index("city_id",["city_",])
export class partner {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"partner_id"
        })
    partner_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:100,
        name:"partner_name"
        })
    partner_name:string;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:45,
        name:"partner_phone"
        })
    partner_phone:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"partner_email"
        })
    partner_email:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"partner_logo"
        })
    partner_logo:string | null;
        

   
    @ManyToOne(type=>city, city=>city.partners,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'city_id'})
    city_:city | null;


    @Column("float",{ 
        nullable:true,
        precision:12,
        name:"partner_lat"
        })
    partner_lat:number | null;
        

    @Column("float",{ 
        nullable:true,
        precision:12,
        name:"partner_long"
        })
    partner_long:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"partner_address"
        })
    partner_address:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"partner_contact_name"
        })
    partner_contact_name:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"partner_contact_phone"
        })
    partner_contact_phone:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"partner_payment_account"
        })
    partner_payment_account:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"partner_website"
        })
    partner_website:string | null;
        

    @Column("time",{ 
        nullable:true,
        name:"partner_start_time"
        })
    partner_start_time:string | null;
        

    @Column("time",{ 
        nullable:true,
        name:"partner_end_time"
        })
    partner_end_time:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"partner_over_time_fee"
        })
    partner_over_time_fee:number | null;
        

    @Column("tinyint",{ 
        nullable:true,
        name:"partner_support_night"
        })
    partner_support_night:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"partner_limit_km"
        })
    partner_limit_km:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"partner_over_km_fee"
        })
    partner_over_km_fee:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"partner_delivery_free_km"
        })
    partner_delivery_free_km:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"partner_delivery_over_km_fee"
        })
    partner_delivery_over_km_fee:number | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"partner_policy"
        })
    partner_policy:string | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"date_create"
        })
    date_create:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"date_update"
        })
    date_update:Date | null;
        

    @Column("int",{ 
        nullable:true,
        default:"0",
        name:"partner_delivery_home"
        })
    partner_delivery_home:number | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"date_delete"
        })
    date_delete:Date | null;
        
}
