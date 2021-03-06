import { Product } from "src/modules/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


@Entity('invoice')
export class Invoice {

    @PrimaryGeneratedColumn()
    id_invoice: number

    @Column()
    invoice_number: string
    
    @Column()
    invoice_date: Date

    @Column()
    invoice_issuer:string

    @Column()
    issuer_register:string

    @Column('decimal', { precision: 7, scale: 2 })
    value: number;

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @OneToMany(()=>Product, product=>product.invoice)
    product:Product[]
}
