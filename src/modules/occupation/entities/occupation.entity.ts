import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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
}
