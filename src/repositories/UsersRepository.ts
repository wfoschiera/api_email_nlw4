import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {
    static findOne(arg0: { email: any; }) {
        throw new Error('Method not implemented.');
    }
}

export { UsersRepository }