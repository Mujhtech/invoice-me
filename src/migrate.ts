// import "dotenv/config";
// import { db, pool, connection } from "./lib/server/db";
// import { migrate } from "drizzle-orm/postgres-js/migrator";

// const main = async () => {
//   await connection.connect();
//   // This will run migrations on the database, skipping the ones already applied
//   await migrate(connection.query, { migrationsFolder: "./drizzle" });

//   // Don't forget to close the connection, otherwise the script will hang
//   await connection.end();
// };

// main();
