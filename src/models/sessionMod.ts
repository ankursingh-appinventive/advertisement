import Sequelize from "sequelize";
import { sequelize } from "../configuration/config";

const Session = sequelize.define("sessions", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  device_id: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});
(async () => {
  Session.sync({ alter: true }) 
})();

export { Session };
