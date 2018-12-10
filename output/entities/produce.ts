import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("produce",{schema:"car_rental"})
@Index("produce_name_UNIQUE",["produce_name",],{unique:true})
export class produce {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"produce_id"
        })
    produce_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:255,
        name:"produce_name"
        })
    produce_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"produce_icon"
        })
    produce_icon:string | null;
        
}
