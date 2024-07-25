import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const State = sequelize.define(
  "State",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "states",
    timestamps: false,
  }
);

export default State;
