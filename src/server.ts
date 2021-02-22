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

app.get("/", (request, response) => {

    // return response.send("Hello World - NLW04!")
    return response.json({ message: "Hello World - NLW04!" })
})

// 1 param => Rota(recurso API)
// 2 param => request, response

app.post("/", (request, response) => {
    // simulando que recebemos dados para serem salvos
    return response.json({message: "Os dados foram salvos com sucesso!"})
})


app.listen(3333, () => console.log("Server is running!"))
