const quotes = require("../utils/quotes");
const {generateRandom , getTodayDay, sortByDays} = require("../utils/helper");
const Subject = require("../models/subject");
const Note = require("../models/notes");
const CheckboxState = require("../models/checkboxState");
//Home Route
module.exports.index = async (req, res) => {
    try {
        const thought = quotes[generateRandom()];
        if(!req.user){
            return res.render("index",{thought})
        }else{
            const day = getTodayDay();
            const subjectByDays = await sortByDays(req.user._id);
            const todaySubject = subjectByDays[day];    
            const notes = await Note.find({"owner":req.user._id}).populate("owner");
            
            // console.log(thought);

            const checkboxStates = await CheckboxState.find({ userId: req.user._id });
            const checkboxStateMap = new Map(checkboxStates.map(state => [state.subjectId.toString(), state.isChecked]));
            

            res.render("index", { todaySubject, thought, notes, checkboxStateMap});
        }

    } catch (err) {
        console.error("Error in /home route:", err);
        res.status(500).send("Internal Server Error");
    }
};

//Add Task Form Render
module.exports.renderAddTaskForm = (req, res) => {   
    res.render("addTask");
};

//
module.exports.addTask = async (req,res)=>{
    try {
        const newTask = new Subject(req.body.subject);
        newTask.owner = req.user._id;
        await newTask.save();
        req.flash("success","Task added successfully");
        res.redirect("/home");    
    } catch (error) {
        console.error("Error while adding a task:", error); 
        req.flash("error", "Something went wrong while adding the task. Please try again.");
        res.redirect("/home");
    }
};

//View all task
module.exports.renderAllTasks = async(req,res) =>{
    const allTasks = await sortByDays(req.user._id);
    res.render("allTask", {allTasks});
};

//
module.exports.destoryTask = async(req, res) =>{
    try {
        const subjectId = req.params.id;
        const dayToRemove = req.body.day;
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).send('Subject not found');
        }
        const index = subject.studyDays.indexOf(dayToRemove);
        if (index > -1) {
            subject.studyDays.splice(index, 1);
        }
        await subject.save();
        req.flash("success","Task deleted successfully");
        res.redirect('/allTask');
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong while deleting the task. Please try again.");
        res.status(500).send('Server Error');
        res.redirect("/allTask");
    }
};

module.exports.checkboxStatus = async (req, res) => {
    try {
        const { subjectId, isChecked } = req.body;
        const userId = req.user._id;

        let checkboxState = await CheckboxState.findOne({ userId, subjectId });

        if (checkboxState) {
            checkboxState.isChecked = isChecked;
            await checkboxState.save();
        } else {
            checkboxState = new CheckboxState({ userId, subjectId, isChecked });
            await checkboxState.save();
        }

        res.status(200).send('Checkbox state updated');
    } catch (err) {
        console.error("Error updating checkbox state:", err);
        res.status(500).send("Internal Server Error");
    }
}