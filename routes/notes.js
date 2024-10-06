const express = require("express");
const router = express.Router();
const Note = require("../models/notes");
const { isLoggedIn } = require("../middleware");
const notesController = require("../controller/notes");


router.get("/addNote",isLoggedIn,notesController.renderAddNotesForm);

router.post("/addNote", isLoggedIn , notesController.addNote);

router.get("/viewNotes",isLoggedIn, notesController.renderAllNotes);

router.delete("/viewNotes/:id",isLoggedIn, notesController.destoryNote);

module.exports = router;