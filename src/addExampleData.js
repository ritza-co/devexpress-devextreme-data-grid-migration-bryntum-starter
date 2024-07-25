import { readFileSync } from "fs";
import sequelize from "./config/database.js";
import Employee from "./models/Employee.js";
import State from "./models/State.js";

async function setupDatabase() {
  // Wait for all models to synchronize with the database
  await sequelize.sync();

  // Now add example data
  await addExampleData();
}

async function addExampleData() {
  try {
    // Read and parse the JSON data
    const statesData = JSON.parse(
      readFileSync("./src/initialData/states.json")
    );

    const employeesData = JSON.parse(
      readFileSync("./src/initialData/employees.json")
    );

    await sequelize.transaction(async (t) => {
      // Create states first
      const states = await State.bulkCreate(statesData, {
        transaction: t,
      });

      const employees = await Employee.bulkCreate(employeesData, {
        transaction: t,
      });

      return { states, employees };
    });

    console.log("states and employees added to database successfully.");
  } catch (error) {
    console.error("Failed to add data to database due to an error: ", error);
  }
}

setupDatabase();
