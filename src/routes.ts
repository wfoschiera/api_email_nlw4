import { Router } from "express";
import { SurveysController } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";
import { SendMailController } from "./controllers/SendMailController";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

// aqui a magica acontece. Liguei o metodo POST do caminho 
// localhost/users ao controller responsável por criar usuários
router.post("/users", userController.create);
router.get("/users", userController.show);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);

router.post("/sendMail", sendMailController.execute);
router.get("/sendMail", sendMailController.show);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router };