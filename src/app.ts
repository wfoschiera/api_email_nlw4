import 'reflect-metadata'
import express from 'express';
import "./database";
import { router } from './routes';

const app = express();

/**
 * GET => Buscar informações no servidor
 * POST => Salvar informações no servidor
 * PUT => Alterar alguma informação 
 * DELETE => Exclui todo o registro
 * PATCH => Alteração específica. (vantagem: não precisa enviar todo payload, somente o que foi alterado e esse verbo não pode criar.)
 */

//  http://localhost:3333/users

app.use(express.json());
app.use( router )

export{ app }