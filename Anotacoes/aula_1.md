# Primeira aula do NLW04 - [link do vídeo](https://nextlevelweek.com/inscricao/4)

## Iniciando configuração do ambiente de produção
### Instalar o yarn
 - precisa adicionar o repositório e as chaves GPG. Um bom tutorial está [aqui](https://www.hostinger.com.br/tutoriais/yarn-install).

### No terminal:
O Yarn será utilizado como gerenciador de dependências, por ser mais eficiente que o npm. Para instalar:

```npm install yarn```

Depois será criado um arquivo json (packet json) com as informações _default_ para o projeto. Essas informações poderão ser editadas depois.

```
yarn init -y
```

Instalar o micro framework _express_ que será utilizado para criar os middlewares, rotas, etc.
```
yarn add express
```

### Organizando o projeto
Foi criada uma pasta _/src_ e nesta pasta um arquivo _server.ts_.

Perceba a forma como foi feito o _import_. Essa não é a sintaxe padrão do Javascript (JS), mas sim do typescript (TS). Ao tentar rodar esse código utilizando
o Node.js será levantado um erro. Para corrigir, instalar um 'tradutor' do TS para JS. Instalar tanto o typescript (1) quanto o 'tradutor' (2).
1. ```yarn add typescript -D```

1. ```yarn add ts-node-dev -D```

Inicializar o typescript:

```yarn tsc --init ```

Veja que foi criado um arquivo de configuração do typescript, chamado tsconfig.json


Perceba que ao fazer o _import from express_ o VScode apresenta '...', que quer dizer que há um alerta. Isso aparece por que o express possui tipagem externa, então precisamos instalar mais um pacote para que ele funcione
No terminal:

```yarn add types/express -D ```

- Para rodar o JS no Vscode, no teminal:
```node src/server.ts```

Ocorrerá falha se o typescript não estiver instalado e inicializado. Assim como é necessário que o pacote ts-node-dev também esteja instalado.

O pacote ts-node-dev é responsável por fazer a tradução do typescript em tempo de execução, isso vai poupar nosso tempo no futuro.
Ainda, utilizando o package.json é possível criar um alias para executar um arquivo json por meio do _ts-node-dev_, para isso, incluir essas linhas no package.json:
 ```
  "scripts":{
    "dev": "ts-node-dev src/server.ts"
    }
 ```

### Melhorando o script
```
 "scripts":{
   "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts "
   }
```
- __--transpile-only__ para não ficar realizando a verificação de erros nas tipagens durante o desenvolvimento, o próprio VScode fará isso.

- __--ignore-watch node_modules__ para ignorar o que estiver ocorrendo nos modulos do node.

Depois dessas configurações iniciais, o servidor estará rodando.
Testamos os métodos GET e POST na rota raiz ("/"). Só é possível testar na mesma rota se os verbos forem diferentes.
Por padrão o browser trabalha com o método GET, por isso que quando não acessa uma página, o retorno é Cannot GET...

Para testar outros verbos HTTP utilizamos o [insomnia core](https://insomnia.rest/), que foi instalado via pacote snap `sudo snap install insomnia`.
