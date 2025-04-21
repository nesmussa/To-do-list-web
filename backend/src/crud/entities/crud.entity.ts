import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"task"})
export class Crud {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false})
    title: string;

    @Column({type:'text',nullable:true})
    description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({type:"date", nullable:false})
    deadline: Date
}