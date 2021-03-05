import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from "uuid";
import { Survey } from './Survey';
import { User } from './User';

@Entity("surveys_users")
class SurveyUser {


    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    // relação um para muitos entre user_id da tabela surveys_users (um) e a chave id da tabela users (muitos)
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User;

    @Column()
    survey_id: string;

    // relação Um (survey_id/surveys_users) para muitos (id/surveys)
    @ManyToOne(()=> Survey)
    @JoinColumn({ name: "survey_id"})
    survey: Survey;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { SurveyUser }