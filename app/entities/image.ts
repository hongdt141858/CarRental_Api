import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("image",{schema:"car_rental"})
@Index("name_UNIQUE",["image_name",],{unique:true})
export class image {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"image_id"
        })
    image_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"image_name"
        })
    image_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"image_link"
        })
    image_link:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"vehicle_id"
        })
    vehicle_id:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"table_name"
        })
    table_name:string | null;
        
}
