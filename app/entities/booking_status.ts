import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {booking} from "./booking";


@Entity("booking_status",{schema:"car_rental"})
@Index("booking_status_name_UNIQUE",["booking_status_name",],{unique:true})
export class booking_status {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"booking_status_id"
        })
    booking_status_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:50,
        name:"booking_status_name"
        })
    booking_status_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"booking_status_icon"
        })
    booking_status_icon:string | null;
        

   
    @OneToMany(type=>booking, booking=>booking.booking_status_,{ onDelete: 'RESTRICT' })
    bookings:booking[];
    
}
