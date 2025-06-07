import chalk from "chalk";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, connection } from "./config";

import path from "path";

const migrationsFolder = path.join(__dirname, "..", "migrations");

migrate(db, { migrationsFolder })
  .then(() => {
    console.log(chalk.greenBright("Migrations applied successfully!"));
  })
  .catch(console.log)
  .finally(async () => {
    await connection.end();
    process.exit();
  });
