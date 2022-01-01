import { UserProfile } from "src/helper/Enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id_user:number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    register:string

    @Column()
    permission: UserProfile

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

}
