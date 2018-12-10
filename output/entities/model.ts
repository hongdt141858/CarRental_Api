import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("model",{schema:"car_rental"})
@Index("model_name_UNIQUE",["model_name",],{unique:true})
export class model {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"model_id"
        })
    model_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"model_name"
        })
    model_name:string;
        

    @Column("int",{ 
        nullable:false,
        name:"brand_id"
        })
    brand_id:number;
        
}
