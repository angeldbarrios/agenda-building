import { Model, ModelCtor } from "sequelize/types";
import PostgresBaseRepository from "./postgresBaseRepository";

export default class PatientRepository extends PostgresBaseRepository {
  constructor(
    private Schedule: ModelCtor<Model<any, any>>
  ) {
    super(Schedule);
  }

}