import {Request, Response } from "express";
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // verificar se o usuario existe antes de enviar email
        const userAlreadyExists = await usersRepository.findOne({ email });


        if (!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists!",
            });
        }

        // verificar se a pesquisa existe
        const surveyAlreadyExists = await surveysRepository.findOne({
            id: survey_id,
        });
        
        if(!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exists!",
            });
        }

        // Salvar informacoes na tabela SurveyUser

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        });

        await surveysUsersRepository.save(surveyUser);
        
        // Enviar email para o usuario
        return response.status(201).json(surveyUser);
    }

    async show(request: Request, response: Response) {
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // verificar se o usuario existe antes de enviar email
        const all = await surveysUsersRepository.find();   

        return response.json(all);
    }
}

export { SendMailController }