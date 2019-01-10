import Main from "../../Main";
import Sequelize from "../../Models";

export default class Products extends Main {
  category: any;
  product: any;
  image: any;

  constructor() {
    super();
    this.category = Sequelize.models.category;
    this.product = Sequelize.models.product;
    this.image = Sequelize.models.image;
  }

  /**
   * @description Получение списка всех актуальных продуктов
   */
  public async get({ project_id }: { project_id: string }) {
    const data: any = await this.category.findAll({
      where: { 
        actual: true,
        fk_project_id: project_id 
      },
      include: [
        {
          model: this.product,
          required: true,
          include: [{
            model: this.image,
            required: true,
            where: { unit_name: "product" }
          }]
        }
      ]
    });

    return data;
  }
}
