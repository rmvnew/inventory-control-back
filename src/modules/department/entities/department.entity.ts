import { Client } from "src/modules/client/entities/client.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('department')
export class Department {

    @PrimaryGeneratedColumn()
    id_department: number

    @Column()
    name: string

    @Column()
    manager:string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string
    

    @OneToMany(()=>Client, client=>client.department)
    client:Client


}
