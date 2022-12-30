const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.an5qsbu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const statusCollection = client.db("communicate").collection("status");

    app.post("/status", async (req, res) => {
      const status = req.body;
      const result = await statusCollection.insertOne(status);
      res.send(result);
    });

    app.get("/status", async (req, res) => {
      const query = {};
      const result = await statusCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch();
app.get("/", (req, res) => {
  res.send("communicate server running");
});

app.listen(port, () => {
  console.log("communicate server is running at", port);
});
