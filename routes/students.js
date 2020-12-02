const express = require('express');
const router = express.Router();

const Student = require('../models/Student.js');


// 1_ GET BACK ALL THE STUDENTS (WORKING)
router.get('/', async (req, res) => {
    try{
        const students = await Student.find({});
            res.json(students);
    }   catch(err){
            res.json({message: err});
    }
});

// 2_ GET BACK ALL THE NAMES AND CLASSES OF STUDENTS (WORKING)
router.get('/name_and_class', async (req, res) => {
    try{
        const students = await Student.find({},{"name":1,"class":1}).sort({"name":1});
            res.json(students);
    }   catch(err){
            res.json({message: err});
    }
});


// 3_ GET BACK ALL THE ASSESSMENT SCORE (WORKING)
router.get('/assessment/score', async (req, res) => {
    try{
        const students = await Student.find(
            {},
            {"subject.assessment.score":1});
            res.json(students);
    }   catch(err){
            res.json({message: err});
    }
});


// 4_ GET BACK ALL THE ASSESSMENT TOTAL (WORKING)
router.get('/assessment/total', async (req, res) => {
    try{
        const students = await Student.find(
            {},
            {"subject.assessment.total":1}
                );
            res.json(students);
    }   catch(err){
            res.json({message: err});
    }
});

// 5_ GET BACK ALL THE STUDENTS SUBJECTS (WORKING)
router.get('/subjects', async (req, res) => {
    try{
        const students = await Student.find(
            {},
            {"subject.subjectname":1}
                );
            res.json(students);
    }   catch(err){
            res.json({message: err});
    }
});

// 6_ GET THE SUM OF SCORES (WORKING)
router.get('/sum_score', async (req, res) => {
    try{
        const students = await Student.aggregate([
            {"$unwind":"$subject"},
            {"$unwind":"$subject.assessment"},
            {"$unwind":"$subject.assessment.score"},
            {
                $group: {
                  _id: "$name",
                  sum_score : {
                    $sum : "$subject.assessment.score"
                }
                }
             }]);
            res.json(students);
    }   catch(err){
            res.json({message: err});
    }
});

router.get('/sum_total', async (req, res) => {
    try{
        const students = await Student.aggregate([
            {"$unwind":"$subject"},
            {"$unwind":"$subject.assessment"},
            {"$unwind":"$subject.assessment.total"},
            {
                $group: {
                  _id: "$name",
                  sum_total : {
                    $sum : "$subject.assessment.total"
                }
                }
             }]);
            res.json(students);
    }   catch(err){
            res.json({message: err});
    }
});

// 7_ ADD A STUDENT (WORKING)
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        class: req.body.class,
        /*
        maths: {
            marks: req.body.marks
        }
        */
        subject: [{
            subjectname: req.body.subjectname,
            assessment: [{
                type: req.body.type,
                score: req.body.score,
                total: req.body.total,
            }],
        }],
        /*
        gendar: req.body.gendar,
        birthday: req.body.birthday,
        */
    });
    try{
    //console.log(req.body);
    const savedStudent = await student.save()
    res.json(savedStudent);
    }catch(err){
        res.json({message: err});
    }
});


// _8 SPECIFIC STUDENT (WORKING)
router.get('/:studentId', async (req, res) => {
    try{
        const student = await Student.findById(req.params.studentId);
        res.json(student);
    }catch (err) {
        res.json({ message: err });
    }
});


// 9_ REMOVE A STUDENT (WORKING)
router.delete('/:studentId', async (req, res) => {
    try{
        const removedStudent = await Student.remove({ _id: req.params.studentId });
        res.json(removedStudent);
    }catch (err) {
        res.json({ message: err });
    }
});


// 10_ UPDATE A STUDENT SUBJECT (WORKING)
router.post('/:studentId', async (req, res) => {
    try{
    const updatedStudent = await Student.updateOne({ _id: req.params.studentId }, 
        {
            $push: { 
                subject: [{
                    subjectname: req.body.subjectname,
                    assessment: [{
                        type: req.body.type,
                        score: req.body.score,
                        total: req.body.total,
                    }],
                }],
             }
        });
        res.json(updatedStudent);
            }catch (err) {
                res.json({ message: err });
    }
});


// 11_ DELETE ASSESSMENT FOR A STUDENT (WORKING)
router.patch('/assesstype/:studentId/:subjectId', async (req, res) => {
    try{
    const updatedAssessment = await Student.findByIdAndUpdate(
        { _id: req.params.studentId }, 
        { $pull: { "subject" : { _id: req.params.subjectId }}},           
        );
        res.json(updatedAssessment);
            }catch (err) {
                res.json({ message: err });
    }
});

// 12_ ADD AN ASSESSMENT TYPE, TOTAL AND SCORE TO 
// A SUBJECT FOR A STUDENT (WORKING)
router.post('/coremaths/:studentId', async (req, res) => {
    try{
    const updatedAssessment = await Student.findByIdAndUpdate(
        { _id: req.params.studentId }, 
        {$push: 
            {"subject.0.assessment.0.total":req.body.total,
            "subject.0.assessment.0.score":req.body.score,
            "subject.0.assessment.0.type":req.body.type,}
        },          
        );
        res.json(updatedAssessment);
            }catch (err) {
                res.json({ message: err });
    }
});


router.post('/electivemaths/:studentId', async (req, res) => {
    try{
    const updatedAssessment = await Student.findOneAndUpdate(
        { _id: req.params.studentId }, 
        {$push: 
            {"subject.1.assessment.0.total":req.body.total,
            "subject.1.assessment.0.score":req.body.score,
            "subject.1.assessment.0.type":req.body.type,}
        }        
        );
        res.json(updatedAssessment);
            }catch (err) {
                res.json({ message: err });
    }
});

/*
// UPDATE MARKS OF A SPECIFIC STUDENT(WORKING)
router.post('/:studentId', async (req, res) => {
    try{
        const student = await Student.findOneAndUpdate(
            {_id: req.params.studentId},
            { "$push": { "maths.marks": req.body.marks }},           
            );
        res.json(student);
    }catch (err) {
        res.json({ message: err });
    }
});
*/

module.exports = router;