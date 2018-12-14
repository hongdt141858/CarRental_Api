import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("vehicle_partner",{schema:"car_rental"})
export class vehicle_partner {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
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
        name:"vehicle_id"
        })
    vehicle_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"vehicle_name"
        })
    vehicle_name:string;
        

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
        

    @Column("year",{ 
        nullable:false,
        name:"vehicle_partner_year"
        })
    vehicle_partner_year:number;
        

    @Column("int",{ 
        nullable:false,
        name:"vehicle_partner_default_price"
        })
    vehicle_partner_default_price:number;
        

    @Column("int",{ 
        nullable:true,
        name:"vehicle_partner_deposit"
        })
    vehicle_partner_deposit:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"vehicle_partner_quantity_total"
        })
    vehicle_partner_quantity_total:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"vehicle_partner_quantity_available"
        })
    vehicle_partner_quantity_available:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"vehicle_partner_policy"
        })
    vehicle_partner_policy:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"vehicle_partner_priority"
        })
    vehicle_partner_priority:number | null;
        

    @Column("int",{ 
        nullable:true,
        default:"0",
        name:"vehicle_partner_hide"
        })
    vehicle_partner_hide:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"vehicle_partner_slug"
        })
    vehicle_partner_slug:string | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"vehicle_partner_create"
        })
    vehicle_partner_create:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"vehicle_partner_update"
        })
    vehicle_partner_update:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"vehicle_partner_delete"
        })
    vehicle_partner_delete:Date | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"vehicle_partner_description"
        })
    vehicle_partner_description:string | null;
        
}
