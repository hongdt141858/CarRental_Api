import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("seat",{schema:"car_rental"})
@Index("seat_number_UNIQUE",["seat_number",],{unique:true})
export class seat {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"seat_id"
        })
    seat_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:45,
        name:"seat_number"
        })
    seat_number:string;
        
}
