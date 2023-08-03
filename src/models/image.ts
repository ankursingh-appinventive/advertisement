import Sequelize from "sequelize";
import { sequelize } from "../configuration/config";
const Image = sequelize.define('Images', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  image: { type: Sequelize.ARRAY(Sequelize.BLOB) },
  product_id: { type: Sequelize.INTEGER },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
sequelize.sync({alter:true});

export { Image };