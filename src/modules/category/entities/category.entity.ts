import { Product } from "src/modules/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id_category: number

    @Column()
    name: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @OneToMany(()=>Product, product=> product.category)
    product:Product[]
    
}
