import {Request, Response} from "express";
import { getCustomRepository, getRepository, SimpleConsoleLogger } from "typeorm";
import { User } from "../models/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
    // nossa classe não herdou de nenhum lugar o req/resp, por isso precisamos importar
    async create(request:Request, response:Response){
        // como receber os parametros para salvar? tip: POST
        // ate onde entendi, o body é o data da página.
        
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!",
            })
        }

        const user = usersRepository.create({ 
            name, 
            email,
        });

        await usersRepository.save(user);

        // console.log(body)
        return response.json(user);
    }
}

export { UserController }