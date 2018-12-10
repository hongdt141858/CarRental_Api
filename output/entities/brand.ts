import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("brand",{schema:"car_rental"})
@Index("brand_name_UNIQUE",["brand_name",],{unique:true})
export class brand {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"brand_id"
        })
    brand_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"brand_name"
        })
    brand_name:string;
        
}
