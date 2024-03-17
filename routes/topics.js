// This is code that is very similar to the students.js file in routes, in milestone 5.

var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// localhost:4000/api/topics

// DB name = favorites
// TABLE name = topics

// GET topics list
router.get("/", async function (req, res, next) {
  try {
    let results = await db("SELECT * FROM topics;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET topic by keyword
router.get("/:keyword", async function (req, res, next) {
  const { keyword } = req.params;
  try {
    const results = await db(
      `SELECT * FROM topics WHERE keyword = ${keyword};`
    );
    if (!results.data.length) {
      res.status(404).send({
        message: "Topic not found",
        error: true,
      });
    } else {
      res.send(results.data[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET topic by id
router.get("/:topicId", async function (req, res, next) {
  const { topicId } = req.params;
  try {
    const results = await db(
      `SELECT * FROM topics WHERE topicId = ${topicId};`
    );
    if (!results.data.length) {
      res.status(404).send({
        message: "ID not found",
        error: true,
      });
    } else {
      res.send(results.data[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
