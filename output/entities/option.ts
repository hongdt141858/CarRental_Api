import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("option",{schema:"car_rental"})
@Index("option_name_UNIQUE",["option_name",],{unique:true})
export class option {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"option_id"
        })
    option_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"option_name"
        })
    option_name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:128,
        name:"option_icon"
        })
    option_icon:string;
        
}
