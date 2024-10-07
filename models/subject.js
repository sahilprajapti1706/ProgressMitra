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

subjectSchema.pre("save", async function (next) {
  if (this.studyDays.length === 0) {
    await this.deleteOne(); 
  } else {
    next();
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
