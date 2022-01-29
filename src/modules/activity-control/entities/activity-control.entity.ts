import { Material } from "src/modules/material/entities/material.entity";
import { Client } from "src/modules/client/entities/client.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Project } from "src/modules/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('activity_control')
export class ActivityControl {


    @PrimaryGeneratedColumn()
    id_activity_control: number

    @Column()
    moviment: number

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @ManyToOne(() => Client, client => client.activity)
    client: Client

    @ManyToOne(() => Project, project => project.activity)
    project: Project

    @OneToOne(() => Material, material=> material.activity)
    material: Material



}





