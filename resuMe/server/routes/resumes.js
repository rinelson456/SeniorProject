const bodyParser = require("body-parser")
var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenorator');
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

const Resume = require('../models/resume');

module.exports = router;

router.get('/', (req, res, next) => {
    Resume.find()
        .then(resumes => {
            res.status(200).json({
                resumes: resumes
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.post('/', (req, res, next) => {
    const maxResumeId = sequenceGenerator.nextId("resumes");

    const resume = new Resume({
        id: maxResumeId,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        role: req.body.role
    });

    console.log(resume)

    resume.save()
        .then(createdResume => {
            res.status(201).json({
                message: 'Resume added successfully',
                resume: createdResume
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Resume.findOne({ id: req.params.id })
        .then(resume => {
            resume.name = req.body.name;
            resume.description = req.body.description;
            resume.date = req.body.date;
            resume.role = req.body.role;

            resume.updateOne({ id: req.params.id }, resume)
                .then(result => {
                    res.status(204).json({
                        message: 'Resume updated successfully'
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Resume not found.',
                error: { resume: 'Resume not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Resume.findOne({ id: req.params.id })
        .then(resume => {
            resume.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Resume deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Resume not found.',
                error: { resume: 'Resume not found' }
            });
        });
});