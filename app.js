require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));

mongoose.connect('mongodb+srv://rakshitgondwal:chitkararakshit@cluster0.rtnxftk.mongodb.net/technovation');


//////////////////////////////////////// SCHEMAS //////////////////////////////////////////////////////////////////////

const jobSchema = new mongoose.Schema({
  name: String,
  jobName: String,
  jobDescription: String,
  location: String,
  duration: String,
  contact: String,
  email: String,
  wage: String
});


const applySchema = new mongoose.Schema({
  name: String,
  age: String,
  contact: String,
  location: String,
  about: String
});

const questionsSchema = new mongoose.Schema({
  mail: String,
  name: String,
  description: String
});

const feedbackSchema = new mongoose.Schema({
  mail: String,
  subject: String,
  description: String
});

///////////////////////////////////////////// MODELS ///////////////////////////////////////////////////////////////////////////

const Job = mongoose.model("Job", jobSchema);

const Apply = mongoose.model("Apply", applySchema);

const Question = mongoose.model("Question", questionsSchema);

const Feedback = mongoose.model("Feedback", feedbackSchema);

/////////////////////////////////////////////////// GET FUNCTIONS  //////////////////////////////////////////////////////////////////////


app.get("/", function (req, res) {
  Job.find({}, function (err, jobs) {

    if (err) {
      console.log(err);
    } else {
      res.render("english/index", {
        postedJobs: jobs
      });
    }

  })
});

app.get("/question", function (req, res) {
  res.sendFile(__dirname + '/pages/english/question.html')
});

app.get("/feedback", function (req, res) {
  res.sendFile(__dirname + '/pages/english/feedback.html')
});

app.get("/createJob", function (req, res) {
  res.sendFile(__dirname + "/pages/english/createJob.html");
});

app.get("/apply", function (req, res) {
  res.sendFile(__dirname + "/pages/english/apply.html")
})

app.get("/skills", function(req,res){
  res.sendFile(__dirname+"/pages/english/skills.html")
});





app.get("/hindi", function (req, res) {
  Job.find({}, function (err, jobs) {

    if (err) {
      console.log(err);
    } else {
      res.render("hindi/indexHindi", {
        postedJobs: []
      });
    }

  })
});

app.get("/questionHindi", function (req, res) {
  res.sendFile(__dirname + '/pages/hindi/questionHindi.html')
});

app.get("/feedbackHindi", function (req, res) {
  res.sendFile(__dirname + '/pages/hindi/feedbackHindi.html')
});

app.get("/createJobHindi", function (req, res) {
  res.sendFile(__dirname + "/pages/hindi/createJobHindi.html");
});

app.get("/applyHindi", function (req, res) {
  res.sendFile(__dirname + "/pages/hindi/applyHindi.html")
})

app.get("/skillsHindi", function(req,res){
  res.sendFile(__dirname+"/pages/hindi/skillsHindi.html")
});


/////////////////////////////////////////////////////  POST FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////


app.post("/feedbackSubmit", function (req, res) {

  const feedback = new Feedback({
    mail: req.body.email,
    subject: req.body.subject,
    description: req.body.description
  });

  feedback.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.sendFile(__dirname + "/pages/english/successFeedback.html")
    }
  });
});


app.post("/questionSubmit", function (req, res) {

  const question = new Question({
    mail: req.body.email,
    name: req.body.fName,
    description: req.body.message
  });

  question.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.sendFile(__dirname + "/pages/english/successQuestion.html")
    }
  });

});

app.post("/jobCreate", function (req, res) {
  const job = new Job({
    name: req.body.jName,
    jobName: req.body.jTitle,
    jobDescription: req.body.jDesc,
    location: req.body.jLocation,
    duration: req.body.jDuration,
    contact: req.body.jPno,
    email: req.body.jMail,
    wage: req.body.jWage
  });

  job.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  })

});

app.post("/applied", function (req, res) {
  const apply = new Apply({
    name: req.body.name,
    age: req.body.age,
    contact: req.body.pno,
    location: req.body.location,
    about: req.body.desc
  });

  apply.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  })
});

app.post("/search", function (req, res) {
  Job.find({}, function (err, jobs) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < jobs.length; i++) {
        if (jobs[i].location == req.body.reqLocation || jobs[i].jobName == req.body.reqKeyword) {
          res.render("english/searched", {
            searchName: jobs[i].jobName,
            searchWage: jobs[i].wage,
            searchLocation: jobs[i].location,
            searchDuration: jobs[i].duration
          })
        } else {
          res.sendFile(__dirname + "/pages/english/fail.html")
        }
      }
    }
  });
})





app.post("/feedbackSubmitHindi", function (req, res) {

  const feedback = new Feedback({
    mail: req.body.email,
    subject: req.body.subject,
    description: req.body.description
  });

  feedback.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.sendFile(__dirname + "/pages/hindi/successFeedback.html")
    }
  });
});


app.post("/questionSubmitHindi", function (req, res) {

  const question = new Question({
    mail: req.body.email,
    name: req.body.fName,
    description: req.body.message
  });

  question.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.sendFile(__dirname + "/pages/hindi/successQuestion.html")
    }
  });

});

app.post("/jobCreateHindi", function (req, res) {
  const job = new Job({
    name: req.body.jName,
    jobName: req.body.jTitle,
    jobDescription: req.body.jDesc,
    location: req.body.jLocation,
    duration: req.body.jDuration,
    contact: req.body.jPno,
    email: req.body.jMail,
    wage: req.body.jWage
  });

  job.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/hindi");
    }
  })

});

app.post("/appliedHindi", function (req, res) {
  const apply = new Apply({
    name: req.body.name,
    age: req.body.age,
    contact: req.body.pno,
    location: req.body.location,
    about: req.body.desc
  });

  apply.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/hindi");
    }
  })
});

app.post("/searchHindi", function (req, res) {
  Job.find({}, function (err, jobs) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < jobs.length; i++) {
        if (jobs[i].location == req.body.reqLocation || jobs[i].jobName == req.body.reqKeyword) {
          res.render("hindi/searched", {
            searchName: jobs[i].jobName,
            searchWage: jobs[i].wage,
            searchLocation: jobs[i].location,
            searchDuration: jobs[i].duration
          })
        } else {
          res.sendFile(__dirname + "/pages/hindi/fail.html")
        }
      }
    }
  });
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port`);
});
