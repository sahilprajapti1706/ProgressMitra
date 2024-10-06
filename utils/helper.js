const Subject = require("../models/subject");

function generateRandom(){
  const randomNumber = Math.floor(Math.random() * 50);
  return randomNumber;
}

function getTodayDay(){
    const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const day = daysArr[date.getDay()];
    return day;
}

async function sortByDays(id) {
    const subjects = await Subject.find({"owner":id}).populate("owner");
    // console.log(subjects);
    const subjectsByDay = {};
    subjects.forEach(subject => {
        subject.studyDays.forEach(day => {
          if (!subjectsByDay[day]) {
            subjectsByDay[day] = [];
          }
          subjectsByDay[day].push({name: subject.name, id: subject._id});
        });
      }); 
    return subjectsByDay;
}


module.exports = { getTodayDay , sortByDays, generateRandom };