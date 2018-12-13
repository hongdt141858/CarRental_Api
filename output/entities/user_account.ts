import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("user_account",{schema:"car_rental"})
export class user_account {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"user_account_id"
        })
    user_account_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"user_account_name"
        })
    user_account_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"user_account_full_name"
        })
    user_account_full_name:string | null;
        

    @Column("longtext",{ 
        nullable:false,
        name:"user_account_password"
        })
    user_account_password:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"user_account_token"
        })
    user_account_token:string | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"user_account_email"
        })
    user_account_email:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"user_account_phone"
        })
    user_account_phone:string | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"user_account_last_login"
        })
    user_account_last_login:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"user_account_create"
        })
    user_account_create:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"user_account_update"
        })
    user_account_update:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"user_account_delete"
        })
    user_account_delete:Date | null;
        
}
