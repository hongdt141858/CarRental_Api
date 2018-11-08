import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("weekday",{schema:"car_rental"})
@Index("weekday_name_UNIQUE",["weekday_name",],{unique:true})
export class weekday {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"weekday_id"
        })
    weekday_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:50,
        name:"weekday_name"
        })
    weekday_name:string;
        

    @Column("int",{ 
        nullable:false,
        name:"weekday_index"
        })
    weekday_index:number;
        
}
