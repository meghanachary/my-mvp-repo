// This is code that is very similar to the students.js file in routes, in milestone 5.

var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// Not sure if this is the right file to do this. I am trying to access the healthTopics array of objects
const topics = express();
topics.use(express.json());
const PORT = 4000;
const topics = require("./data/sleepTopics.js");

// localhost:4000/api/topics

// This is the DB and table I created in SQL
// DB name = favorites
// TABLE name = topics

// GET
router.get("/", async function (req, res, next) {
  res.send({ message: "Hello! Try /sleepTopics" });
});

// GET all topics
topics.get("/sleepTopics", function (req, res) {
  res.send(data);
});

// GET sleep topic by ID
