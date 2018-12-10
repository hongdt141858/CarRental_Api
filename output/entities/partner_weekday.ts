import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("partner_weekday",{schema:"car_rental"})
export class partner_weekday {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"partner_weekday_id"
        })
    partner_weekday_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"partner_id"
        })
    partner_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"weekday_id"
        })
    weekday_id:number;
        

    @Column("int",{ 
        nullable:true,
        default:"0",
        name:"weekday_extra_fee"
        })
    weekday_extra_fee:number | null;
        
}
