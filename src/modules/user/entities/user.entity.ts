import { UserProfile } from "src/helper/Enums";
import { Department } from "src/modules/department/entities/department.entity";
import { Occupation } from "src/modules/occupation/entities/occupation.entity";
import { Phone } from "src/modules/phone/entities/phone.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

    @OneToOne(()=> Phone, phone => phone.user,{eager:true})
    @JoinColumn()
    phone : Phone

    @ManyToOne(()=> Department, department => department.user)
    department:Department

    @ManyToOne(()=> Occupation, occupation=>occupation.user)
    occupation:Occupation

}
