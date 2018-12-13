import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("partner_procedure",{schema:"car_rental"})
export class partner_procedure {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"partner_procedure_id"
        })
    partner_procedure_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"procedure_id"
        })
    procedure_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"partner_id"
        })
    partner_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"procedure_description"
        })
    procedure_description:string | null;
        
}
