import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

}
