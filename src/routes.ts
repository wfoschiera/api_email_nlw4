import { Router } from "express";
import { SurveysController } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveysController();
// aqui a magica acontece. Liguei o metodo POST do caminho 
// localhost/users ao controller responsável por criar usuários
router.post("/users", userController.create);
router.post("/surveys", surveyController.create);

router.get("/surveys", surveyController.show);

export { router };