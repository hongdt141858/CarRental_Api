import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("booking_feedback",{schema:"car_rental"})
export class booking_feedback {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"booking_feedback_id"
        })
    booking_feedback_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"booking_id"
        })
    booking_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"user_id"
        })
    user_id:number;
        

    @Column("int",{ 
        nullable:true,
        name:"booking_feedback_star"
        })
    booking_feedback_star:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"booking_feedback_coment"
        })
    booking_feedback_coment:string | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"booking_feedback_create"
        })
    booking_feedback_create:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"booking_feedback_delete"
        })
    booking_feedback_delete:Date | null;
        
}
