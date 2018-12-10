import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("fuel",{schema:"car_rental"})
@Index("fuel_name_UNIQUE",["fuel_name",],{unique:true})
export class fuel {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"fuel_id"
        })
    fuel_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"fuel_name"
        })
    fuel_name:string;
        
}
