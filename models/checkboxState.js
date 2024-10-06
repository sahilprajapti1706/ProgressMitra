const mongoose = require("mongoose");

const checkboxStateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    isChecked: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('CheckboxState', checkboxStateSchema);
