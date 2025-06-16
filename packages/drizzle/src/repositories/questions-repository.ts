import { BaseRepository } from "./base-repository";
import { questions, Question } from "../schema";

export class QuestionRepository extends BaseRepository<Question> {
  protected table = questions;
}
