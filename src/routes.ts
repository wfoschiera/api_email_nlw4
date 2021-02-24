import { Router } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
// aqui a magica acontece. Liguei o metodo POST do caminho 
// localhost/users ao controller responsável por criar usuários
router.post("/users", userController.create);

export { router };