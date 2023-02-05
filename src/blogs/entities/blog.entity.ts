import { User } from "src/users/entities/user.entity";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, AfterLoad} from "typeorm";

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    topic: string;

    @Column({ default: 'nopic.png' })
    photo: string;

    @ManyToOne(() => User, user => user.blogs)
    user: User;

    @AfterLoad()
    getUrl(): void {
        this.photo = 'http://localhost:3000/images/' + this.photo;
    }

}
