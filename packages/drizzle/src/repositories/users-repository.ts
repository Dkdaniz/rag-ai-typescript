import { BaseRepository } from "./base-repository";
import { users, User } from "../schema";

export class UserRepository extends BaseRepository<User> {
  protected table = users;
}
