const Note = require("../models/notes");

module.exports.renderAddNotesForm = (req,res) =>{
    res.render("addNote");
};

module.exports.addNote = async (req, res) => {
    try {
        console.log(req.body); 
        const newNote = new Note(req.body.note);
        newNote.owner = req.user._id;
        const savedNote = await newNote.save();
        req.flash("success","Note added successfully");
        console.log(savedNote);
        res.redirect("/home");
    } catch (err) {
        console.error("Error saving the note:", err);
        req.flash("error", "Something went wrong while adding the note. Please try again.");
        res.status(500).send("Internal Server Error");
        res.redirect("/home");
    }
};

module.exports.renderAllNotes = async (req,res) =>{
    try{
        const notes = await Note.find({"owner":req.user._id});
        res.render("viewNotes", {notes} );
    }
    catch(err){
        console.log(err);
    }
};

module.exports.destoryNote = async(req, res) =>{
    try{
        let {id} = req.params;
        await Note.findByIdAndDelete(id);
        req.flash("success","Note deleted successfully");
        res.redirect("/viewNotes");
    }catch(err){
        console.log(err);
        req.flash("error", "Something went wrong while adding the note. Please try again.");
        res.redirect("/viewNotes");
    }
};

module.exports

