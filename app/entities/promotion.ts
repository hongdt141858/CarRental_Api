import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("promotion",{schema:"car_rental"})
@Index("promotion_code_UNIQUE",["promotion_code",],{unique:true})
export class promotion {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"promotion_id"
        })
    promotion_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:255,
        name:"promotion_code"
        })
    promotion_code:string;
        

    @Column("int",{ 
        nullable:false,
        name:"promotion_value"
        })
    promotion_value:number;
        

    @Column("int",{ 
        nullable:true,
        name:"vehicle_id"
        })
    vehicle_id:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"vehicle_partner_id"
        })
    vehicle_partner_id:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"partner_id"
        })
    partner_id:number | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"promotion_active"
        })
    promotion_active:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"promotion_expire"
        })
    promotion_expire:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"promotion_create"
        })
    promotion_create:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"promotion_update"
        })
    promotion_update:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"promotion_delete"
        })
    promotion_delete:Date | null;
        
}
