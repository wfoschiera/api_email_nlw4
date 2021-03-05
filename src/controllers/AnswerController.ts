import { getCustomRepository, Not, IsNull } from 'typeorm';
import { Request } from 'express';
import { Response } from 'express';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { AppError } from '../errors/AppErrors';



class AnswerController {

    // Route params => parametros que compoe a rota (p.e. o "answer" o "1")
    // Para recuperar varios route params: routes.get("/answer/:value/:nota/:batata")
    // sempre : seguido do nome que sera dado a variavel

    // query params - Utilizados para busca/paginaçao. Parametros nao obrigatorios. Mesmo que nao informar, a rota continua funcionando.
    // chave=valor
    async execute(request: Request, response:Response){

        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });
        if (!surveyUser) { 
            throw new AppError("Survey User does not exists!")
            // return response.status(400).json({
            //     error: "Survey User does not exists!"
            // })

        }
        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);
        
        return response.json(surveyUser);
    }
}

export {AnswerController}