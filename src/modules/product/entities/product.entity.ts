import { ActivityControl } from "src/modules/activity-control/entities/activity-control.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { Department } from "src/modules/department/entities/department.entity";
import { Invoice } from "src/modules/invoice/entities/invoice.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('product')
export class Product {

    @PrimaryGeneratedColumn()
    id_product: number

    @Column()
    name: string

    @Column()
    barcode: string

    @Column()
    part_number: string

    @Column()
    model: string

    @Column()
    condition: string

    @Column()
    quantity: number

    @Column()
    minimum_quantity: number

    @Column('decimal', { precision: 7, scale: 2 })
    value: number
   
    @Column()
    location: string

    @Column()
    institute_code: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @ManyToOne(() => Invoice, invoice => invoice.product)
    invoice: Invoice

    @ManyToOne(() => Category, category => category.product)
    category: Category

    @ManyToOne(()=> Department, department => department.product)
    department:Department

    @OneToMany(() => ActivityControl, active=> active.product)
    active: Product[]



}
