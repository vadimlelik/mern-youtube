const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const authRouts  =  require('./routes/auth.routs')

const app = express();
const PORT = config.get("port") || 3001;

app.use('/api/auth',authRouts)

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log("started " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
