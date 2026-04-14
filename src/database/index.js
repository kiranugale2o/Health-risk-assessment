import mongoose from "mongoose";
mongoose.set("strictPopulate", false);

async function DatabaseConn() {
  const Mongo_DB =
    "mongodb+srv://kiransstartup_db_user:7teRDMkNeWeN8XyM@cluster0.yow5eto.mongodb.net/HealthCare";

  const mongoose = require("mongoose");

  let isConnected; // Track the connection status

  if (isConnected) {
    return; // Use existing connection
  }

  await mongoose.connect(Mongo_DB);
  isConnected = true; // Set connection status
}

export default DatabaseConn;
