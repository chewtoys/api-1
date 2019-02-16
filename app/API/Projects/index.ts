import Main from "../../Main";
import Sequelize from "../../Models";

export default class Projects extends Main {
  project: any;
  setting: any;

  constructor() {
    super();

    this.project = Sequelize.models.project;
    this.setting = Sequelize.models.setting;
  }

  public async get() {
    const data = await this.project.findAll({
      include: [
        {
          model: this.setting,
          required: true
        }
      ]
    });

    return [data];
  }
}