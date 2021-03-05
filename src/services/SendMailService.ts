import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";


class SendMailService {
    private client:Transporter
    constructor(){
        nodemailer.createTestAccount().then(account => {
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            this.client = transporter
        })
    }
    
    async execute(to:string, subject: string, variables: object, path: string){


        // o filesystem (fs) faz a leitura do conteudo do arquivo
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        // o handlebars tem a capacidade de ler as variaveis {{}} para fazermos um parse depois
        const mailTemplateParse = handlebars.compile(templateFileContent)

        // aqui fazemos o parse entre as variaveis do handlebar e as variaveis do sendMail
        const html = mailTemplateParse({
            name: variables["name"],
            title: variables["title"],
            description: variables["description"],
            user_id: variables["user_id"],
            link: variables["link"]
        })

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreply@nps.com.br"
        });
        console.log("Message sent: %s", message.Id);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));


    }
}
// dessa forma instancia a classe assim que a aplicação começa a rodar.
export default new SendMailService();