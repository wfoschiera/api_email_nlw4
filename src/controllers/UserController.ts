import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from "yup";
class UserController {
    // nossa classe não herdou de nenhum lugar o req/resp, por isso precisamos importar
    async create(request:Request, response:Response){
        // como receber os parametros para salvar? tip: POST
        // ate onde entendi, o body é o data da página.
        
        const { name, email } = request.body;

        // validar entrada de dados usando yup
        const schema = yup.object().shape({
            name:yup.string().required("Nome é obrigatório!"),
            email: yup.string().email().required("Email incorreto!"),
        });

        
        try {
            await schema.validate(request.body, { abortEarly: false});
        } catch (err) {
            return response.status(400).json({ error: err });
        }

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
        return response.status(201).json(user);
    }
    async show(request: Request, response: Response){
        const usersRepository = getCustomRepository(UsersRepository);

        const all = await usersRepository.find();

        return response.json(all);
    }
}

export { UserController };
