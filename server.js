const express = require("express");
const app = express();

const dotEnv = require("dotenv");
dotEnv.config();

app.use(express.json());
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

const PORT = process.env.PORT;
const MONGO_U = process.env.MONGO_USR;
const MONGO_P = process.env.MONGO_PSWRD;

const mongoose = require("mongoose");
const url = `mongodb+srv://${MONGO_U}:${MONGO_P}@dataregister.nh3ts.mongodb.net/?retryWrites=true&w=majority&appName=DataRegister`

const routes = require("./routes/index");
app.use("/", routes);

const connectToMongo = async () => {
    try {
        await mongoose.connect(url);
        app.listen(PORT, () => {
            console.log(`Server Online and Connected to DATABASE`);
        })
    } catch (error) {
        console.log(error);
    }
}

connectToMongo();