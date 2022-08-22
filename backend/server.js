const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`server down due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("server down due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
