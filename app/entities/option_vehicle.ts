import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("option_vehicle",{schema:"car_rental"})
export class option_vehicle {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"option_vehicle_id"
        })
    option_vehicle_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"vehicle_id"
        })
    vehicle_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"option_id"
        })
    option_id:number;
        
}
