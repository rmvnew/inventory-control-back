import { ApiProperty } from "@nestjs/swagger";
import { ActivityControl } from "src/modules/activity-control/entities/activity-control.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('material')
export class Material {

    @PrimaryGeneratedColumn()
    id_material: number

    @Column()
    quantity: number

    @Column()
    operation_type: string  

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @ManyToOne(() => Product, product => product.material)
    product: Product

    @OneToOne(() => ActivityControl, activity => activity.material,{eager:true})
    @JoinColumn()
    activity: ActivityControl

}
