import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('Phone')
export class Phone {

    @PrimaryGeneratedColumn()
    id_phone: number

    @Column()
    phone_number: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @OneToOne(()=> User, user=> user.phone)
    user:User

}
