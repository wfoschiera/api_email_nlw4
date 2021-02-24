# Aula 2 - Banco de dados

## 1. Como inserir o BD na nossa aplicação.
3 formas:
 1. Driver de conexão do BD. (postgres, mariadb, etc) Veja mais [aqui](https://node-postgres.com/features/connecting).

    Características: De um driver para outro podem ocorrer mudanças nas configurações e comandos básicos. Assim, é necessário que para cada tipo de banco, seja estudado como funcionam as interações com o BD.
    
    A desvantagem principal é que se no futuro forem mudar o BD do projeto, a transição se torna muito trabalhosa e muitas vezes inviável.


 1. Query builder: Veja mais [aqui](https://knexjs.org).

    Ele traz funções prontas para manipulação do BD. Com isso, as consultas podem ser feitas com pouco ou nenhum uso de SQL.

1. ORM (Object-Relational-Mappers). Veja mais [aqui](https://blog.bitsrc.io/what-is-an-orm-and-why-you-should-use-it-b2b6f75f5e2a).
    São bibliotecas que fazem a abstração das classes da linguagem nativa para objetos do BD. Com isso, toda a manipulação do BD ocorre por meio da linguagem nativa em que estamos trabalhando.
    
    O ORM também permite construir as próprias queries, tornando o processo mais eficiente, quando necessário. Além disso, essa abstração permite que, se necessário, o próprio BD seja alterado, com menos quebra no software do que utilizando o Driver nativo.
    Nesse curso, será utilizado [TypeORM](https://typeorm.io/#/) que é compatível com o TypeScript.


## 2. Instalando BD no projeto
Acessar a pasta do projeto via terminal, instalar TypeORM:
``` 
yarn add typeorm --save 
```

Instalar a biblioteca reflect-metada e importá-la para o arquivo app.ts, instalação:
```
yarn add reflect-metadata --save
```
Importando:
```
import "reflect-metadata";
```

## 3. Setup do BD
Criar dentro da pasta a pasta `./src/database` e dentro desta pasta inserior o arquivo index.ts com o seguinte conteúdo:
```ts
import { createConnection } from "typeorm";

createConnection();
```
Na raiz do projeto, criar o arquivo `ormconfig.json` com a seguinte configuração:
```json
{
    "type": "sqlite",
    "database" : "./src/database/database.sqlite"
}
```
Para testas se as configurações estão corretas, no Terminal:
```
yarn dev
```
Esse comando chamará o alias criado no arquivo `package.json`
```json 
{
  "scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"}
}
```

## 4. Criando as _Migrations_

### 4.1  O que são:
As _migrations_ são as informações de criação ou alterações das tabelas. Elas são como um histórico de tudo que foi feito no BD. Assim, se outra pessoa for rodar o projeto, as _migrations_ irão fazer com que as alterações no BD do projeto sejam refletidas no projeto dessa outra pessoa.

### 4.2 Como começar
Primeiro, inserir um comando para que as _migrations_ rodem automaticamente ao executar o projeto. Para que não seja necessário instalar o TypeORM de forma global, será utilizado o CLI dele. Para inserir um `alias` do typeorm/cli.js:
No arquivo `package.json` incluir o seguinte código dentro de `"scripts"`:
```json
{
  "scripts": {
    ...
    "typeorm": "ts-node-dev node_modules/typeorm/cli.js"
}
```
Para testar se está funcionando, no terminal, executar `yarn typeorm`

### 4.3 Ajustes e organização do projeto
Por padrão, o Typeorm salva as _migrations_  na raiz do projeto, se quiser testar, no Terminal: `yarn typeorm migration:create -n CreateUsers`. Se testou, basta excluir essa _migration_da raiz.
Agora, para configurar um local apropriado, criar a pasta (`/src/database/migrations`) para salvar as _migrations_. Configurar o arquivo `ormconfig.js`, o arquivo ficará assim:
```json
{
    "type": "sqlite",
    "database" : "./src/database/database.sqlite",
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}
```
### 4.4 Criando as primeiras _migrations_.
Depois de configurar o caminho onde serão salvas as migrações, criar a primeira migração. Abrir o arquivo e inserir o código abaixo em UP (criar). O Down é utilizado para fazer Drop Table.
```ts
await queryRunner.createTable(
    new Table({
        name: "users",
        columns: [
            {
                name: "id",
                type: "uuid",
                isPrimary: true
            },
            ... // inserir todos os campos do diagrama de usuarios
        ]
```
Executar a _migration_ utilizando o comando `yarn typeorm migration:run`. Para verificar se foi instalado com sucesso, utilizar (1) ou (2).
1. Instalar plugin Sqlite (alexcvzz.vscode-sqlite). Depois ir na aba View > command pallete, buscar por SQLITE e ir em open DataBase. Essa opção não funcionou para mim.

1. Instalar o beekeeper, no terminal:
```sh
# Install our GPG key
wget --quiet -O - https://deb.beekeeperstudio.io/beekeeper.key | sudo apt-key add -

# add our repo to your apt lists directory
echo "deb https://deb.beekeeperstudio.io stable main" | sudo tee /etc/apt/sources.list.d/beekeeper-studio-app.list

# Update apt and install
sudo apt update
sudo apt install beekeeper-studio
```

As _migrations_ não funcionaram, pois o caminho das _migrations_ não estava setado no `ormconfig.json`. Incluir a seguinte linha:
```json
"migrations": ["./src/database/migrations/**.ts"], //precisa ser array
```

Depois, rodar a _migration_ `yarn typeorm migration:run` novamente. Ainda, encontrei o seguinte erro:
```sh
error TS2705: An async function or method in ES5/ES3 requires the 'Promise' constructor.  Make sure you have a declaration for the 'Promise' constructor or include 'ES2015' in your `--lib` option.
```
Para corrigir, incluí o seguinte código no arquivo `tsconfig.json`:
```json
{
  "compilerOptions": {
    "lib": ["ES2015"], 
    ...
  }
```
Por fim, fiz a configuração da conexão do DB com o BeeKeeper e confirmei que a _migration_ da tabela Users funcionou.

Para reverter as migrações:
```sh
yarn typeorm migrations:revert
```
Obs: Ao executar o comando acima, apenas a última _migration_ será desfeita

## 5. Estrutura para cadastro dos usuários
### 5.1 Controllers
__controllers__ — functions that separate out the code to route requests from the code that actually processes requests [here](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes). E com mais detalhes [neste tópico](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#create_the_route-handler_callback_functions).

Neste tópico da aula criamos a pasta `./src/controllers/` e o arquivo `UserControllers.ts`. Não cabe copiar todo o código aqui, comentários foram inseridos no próprio código para facilitar o entendimento.

Depois, criamos o arquivo `routes.ts`, responsável por fazer o "link" entre o controller e as requisições. Agora, infomar ao `server.ts

### 5.2 Gravando as informações no BD
O ORM é responsável por pegar os dados de uma classe, as `migrations`, e transformá-los em uma tabela no BD. Para estruturar melhor o projeto, foi criada a pasta `./src/models` e dentro, o arquivo `User.ts`.

São feitas algumas alterações no arquivo `tsconfig.json`, de forma a habilitar os decoratos. São elas:
```json
"checkJs": true,    
"strictPropertyInitialization": false,  
"experimentalDecorators": true,     
"emitDecoratorMetadata": true,  
```
Uma dica importante é sobre a criação do UUID. Alguns BDs possuem algum problema na geração desses UUID. Assim, é possível delegar essa responsabilidade para o Framework. 
Instalar:
```sh
yarn add uuid
yarn add @types/uuid -D
``` 
Dentro da propria classe _User_, definimos um _constructor_ para criar o _ID_ na criação do usuário. Um _if_ foi inserido para verificar se já existe um _ID_.

Por fim, foi criado um _usersRepository_ no _userController_. Essa classe traz vários métodos já implementados para consultas no BD.
Depois, mapear as _entitites_ no `ormconfig.json`.

Se agora colocar o servidor no ar, será possível enviar um dado via `insominia` usando o POST e vê-lo salvo no BD.

Ainda, é possível acompanhar a execução do SQL pelo ORM. Para isso, incluir no `ormconfig.json` a linha abaixo:
```json
"logging": true,```.