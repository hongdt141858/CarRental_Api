import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("design",{schema:"car_rental"})
@Index("design_name_UNIQUE",["design_name",],{unique:true})
export class design {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"design_id"
        })
    design_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"design_name"
        })
    design_name:string;
        
}
