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

// Middleware to delete document when studyDays becomes empty
subjectSchema.pre('save', function (next) {
    if (this.studyDays.length === 0) {
      this.remove();
    } else {
      next();
    }
  });

module.exports = mongoose.model('Subject', subjectSchema);