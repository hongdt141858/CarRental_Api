import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("partner_holiday",{schema:"car_rental"})
export class partner_holiday {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"partner_holiday_id"
        })
    partner_holiday_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"partner_id"
        })
    partner_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"holiday_id"
        })
    holiday_id:number;
        

    @Column("int",{ 
        nullable:true,
        default:"0",
        name:"partner_extra_fee"
        })
    partner_extra_fee:number | null;
        
}
