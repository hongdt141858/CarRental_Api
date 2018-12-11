import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {partner} from "./partner";


@Entity("city",{schema:"car_rental"})
@Index("city_name_UNIQUE",["city_name",],{unique:true})
export class city {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"city_id"
        })
    city_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"city_name"
        })
    city_name:string;
        
    
}
