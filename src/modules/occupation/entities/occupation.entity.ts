import { Client } from "src/modules/client/entities/client.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('occupation')
export class Occupation {
    @PrimaryGeneratedColumn()
    id_occupation: number

    @Column()
    name: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @OneToMany(() => Client, client => client.occupation)
    client: Client

    @OneToMany(() => User, user => user.occupation)
    user: User;
}
