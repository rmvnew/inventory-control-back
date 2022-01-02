import { ActivityControl } from "src/modules/activity-control/entities/activity-control.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('project')
export class Project {

    @PrimaryGeneratedColumn()
    id_project: number

    @Column()
    name: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @OneToMany(() => ActivityControl, activity => activity.client)
    activity: ActivityControl[]

}
