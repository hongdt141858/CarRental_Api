import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("holiday",{schema:"car_rental"})
@Index("holiday_name_UNIQUE",["holiday_name",],{unique:true})
export class holiday {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"holiday_id"
        })
    holiday_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"holiday_name"
        })
    holiday_name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:10,
        name:"holiday_from"
        })
    holiday_from:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"holiday_to"
        })
    holiday_to:string;
        
}
