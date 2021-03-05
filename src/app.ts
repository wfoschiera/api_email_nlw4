import 'reflect-metadata';
import express from 'express';
import "express-async-errors"
import { AppError } from './errors/AppErrors';
import { NextFunction, Response } from 'express';
import { Request } from 'express';
import createConnection from "./database";
import { router } from './routes';

createConnection();
const app = express();

/**
 * GET => Buscar informações no servidor
 * POST => Salvar informações no servidor
 * PUT => Alterar alguma informação 
 * DELETE => Exclui todo o registro
 * PATCH => Alteração específica. (vantagem: não precisa enviar todo payload, somente o que foi alterado e esse verbo não pode criar.)
 */

//  http://localhost:3333/users

// app.use(express.json({type: '*/*'}));
app.use(express.json());
app.use( router );

app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message
        });
        
    }
    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`,
    })
})
export { app };