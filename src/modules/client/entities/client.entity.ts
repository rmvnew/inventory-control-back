import { ActivityControl } from "src/modules/activity-control/entities/activity-control.entity";
import { Department } from "src/modules/department/entities/department.entity";
import { Occupation } from "src/modules/occupation/entities/occupation.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('client')
export class Client {

    @PrimaryGeneratedColumn()
    id_client: number

    @Column()
    name: string

    @Column()
    register: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @ManyToOne(()=> Department, department => department.client)
    department:Department

    @ManyToOne(()=> Occupation, occupation=>occupation.client)
    occupation:Occupation
    
    @OneToMany(()=> ActivityControl, activity=> activity.client)
    activity: ActivityControl[]

}
