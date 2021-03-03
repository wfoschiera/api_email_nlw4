import { Connection, createConnection, getConnectionOptions } from "typeorm";

// Sem testes, a conexao era direta. COmo haverá testes, vamos deixar ambas possibilidades: Testes e DEV
// createConnection();

export default async (): Promise<Connection> => {
    // buscar configurações padrao do arquivo ORMCONFIG.json
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === "test" 
            ? "./src/database/database.test.sqlite" 
            : defaultOptions.database,
        })
    );
};
