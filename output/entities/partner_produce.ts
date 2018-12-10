import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("partner_produce",{schema:"car_rental"})
export class partner_produce {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"partner_produce_id"
        })
    partner_produce_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"produce_id"
        })
    produce_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"partner_id"
        })
    partner_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"produce_description"
        })
    produce_description:string | null;
        
}
