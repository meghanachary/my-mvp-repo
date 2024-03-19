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

// This is the DB and table I created in SQL. It will be used for the user to store their favorite topics in later
// DB name = favorites
// TABLE name = topics

// GET ALL topics
router.get("/", async function (req, res, next) {
  try {
    let results = await db("SELECT * FROM topics;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET one topic (by id)
router.get("/:id", async function (req, res, next) {});
