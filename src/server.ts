/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Mongodb Connected");
    server = app.listen(envVars.PORT, () => {
      console.log("Server is listening to port 5000");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

process.on("SIGTERM", () => {
  console.log("Sigterm signal recieved... server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("unhandledRejection", () => {
  console.log("Unhandle Rejection detected... server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("Uncaught Exception detected... server shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
