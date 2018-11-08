import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("vehicle",{schema:"car_rental"})
export class vehicle {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"vehicle_id"
        })
    vehicle_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"version"
        })
    version:string;
        

    @Column("int",{ 
        nullable:false,
        name:"brand_id"
        })
    brand_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"brand_name"
        })
    brand_name:string;
        

    @Column("int",{ 
        nullable:true,
        name:"model_id"
        })
    model_id:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"model_name"
        })
    model_name:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"transmission_id"
        })
    transmission_id:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"transmission_name"
        })
    transmission_name:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"seat_id"
        })
    seat_id:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"seat_number"
        })
    seat_number:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"fuel_id"
        })
    fuel_id:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"fuel_name"
        })
    fuel_name:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"fuel_consumption"
        })
    fuel_consumption:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"design_id"
        })
    design_id:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"design_name"
        })
    design_name:string | null;
        

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
        
}
