import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("procedure",{schema:"car_rental"})
@Index("procedure_name_UNIQUE",["procedure_name",],{unique:true})
export class procedure {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"procedure_id"
        })
    procedure_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:255,
        name:"procedure_name"
        })
    procedure_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"procedure_icon"
        })
    procedure_icon:string | null;
        
}
