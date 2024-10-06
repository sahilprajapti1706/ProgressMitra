const express = require("express");
const router = express.Router();
const Subject = require("../models/subject");
const Note = require("../models/notes");
const CheckboxState = require("../models/checkboxState");
const { isLoggedIn } = require("../middleware");
const taskController = require("../controller/task");


router.get("/home", taskController.index);  

router.get("/addTask",isLoggedIn,taskController.renderAddTaskForm);

router.post("/addTask",isLoggedIn,taskController.addTask);

router.get("/allTask" ,isLoggedIn, taskController.renderAllTasks);

router.delete("/allTask/:id", isLoggedIn,taskController.destoryTask);

router.post("/updateCheckboxState", isLoggedIn, taskController.checkboxStatus);

module.exports = router;