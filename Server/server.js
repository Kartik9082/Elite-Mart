const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down.....");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE;

mongoose.connect(DB, {}).then(() => {
  console.log("DB connection established successfully🙏 ");
});

// console.log(process.env);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, ", " + err.message);
  console.log("Unhandled rejection:  💥 ", "Shutting Down ");
  server.close(() => {
    process.exit(1);
  });
});
