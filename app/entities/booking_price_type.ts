import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("booking_price_type",{schema:"car_rental"})
@Index("booking_price_type_code_UNIQUE",["booking_price_type_code",],{unique:true})
export class booking_price_type {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"booking_price_type_id"
        })
    booking_price_type_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:50,
        name:"booking_price_type_code"
        })
    booking_price_type_code:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"booking_price_type_name"
        })
    booking_price_type_name:string | null;
        
}
