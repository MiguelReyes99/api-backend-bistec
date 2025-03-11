import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id! : number

    @Column({ type: String, nullable: false, length: 100 })
    fileName!: string

    @Column({ type: String, nullable: false, length: 100 })
    url!: string

    @Column({ type: Number, nullable: false })
    size!: number

    @Column({ type: String, nullable: false, length: 100 })
    mimeType!: string

    @CreateDateColumn()
    uploadedAt!: Date
}