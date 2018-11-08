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
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"city_code"
        })
    city_code:string | null;
        

   
    @OneToMany(type=>partner, partner=>partner.city_,{ onDelete: 'RESTRICT' })
    partners:partner[];
    
}
