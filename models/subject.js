const mongoose = require("mongoose");


const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true    
    },
    studyDays:{
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true 
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});

subjectSchema.post("save", async function (doc) {
  if (doc.studyDays.length === 0) {
    await doc.deleteOne();
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
