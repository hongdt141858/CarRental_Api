import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("transmission",{schema:"car_rental"})
@Index("vhc_tms_name_UNIQUE",["transmission_name",],{unique:true})
export class transmission {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"transmission_id"
        })
    transmission_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:255,
        name:"transmission_name"
        })
    transmission_name:string;

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:255,
        name:"transmission_slug"
        })
    transmission_slug:string;
        
}
