import { nodemailer } from 'nodemailer';
import {Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from "../services/SendMailService";


class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // verificar se o usuario existe antes de enviar email
        const user = await usersRepository.findOne({ email });


        if (!user) {
            return response.status(400).json({
                error: "User does not exists!",
            });
        }

        // verificar se a pesquisa existe
        const survey = await surveysRepository.findOne({
            id: survey_id,
        });
        
        if(!survey) {
            return response.status(400).json({
                error: "Survey does not exists!",
            });
        }

        // Salvar informacoes na tabela SurveyUser
        const surveyUserExists = await surveysUsersRepository.findOne({
            // where com condicao de AND
            where:{user_id: user.id, value: null},
            // where com condicao de OR
            // where:[{user_id: user.id}, {value: null}],
            // criando a relacao um para muitos no Model, e possivel buscar outras relacoes na pesquisa e devolver isso no json
            relations: ["user", "survey"],
        })

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }
        
        // o path foi utilizado para trazer um path generico
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        if(surveyUserExists) {
            variables.id = surveyUserExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath)
            return response.json(surveyUserExists)
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id,
        });

        await surveysUsersRepository.save(surveyUser);
        
        variables.id = surveyUser.id
        // Enviar email para o usuario
        await SendMailService.execute(email, survey.title, variables, npsPath)

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