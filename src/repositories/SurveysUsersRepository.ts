import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";
import { User } from "../models/User";

// a entitiy do repository liga com o model
// a entity do model liga com a migration (BD)
@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {}

export { SurveysUsersRepository };