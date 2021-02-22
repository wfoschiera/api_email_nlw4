import express from 'express';

const app = express();

/**
 * GET => Buscar informações no servidor
 * POST => Salvar informações no servidor
 * PUT => Alterar alguma informação 
 * DELETE => Exclui todo o registro
 * PATCH => Alteração específica. (vantagem: não precisa enviar todo payload, somente o que foi alterado e esse verbo não pode criar.)
 */

//  http://localhost:3333/users

app.get("/users", (request, response) => {
    return response.send("Hello World - NLW04!")
})

 app.listen(3333, () => console.log("Server is running!"))
