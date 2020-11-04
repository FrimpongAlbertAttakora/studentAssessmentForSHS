const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    class: {
        type: String,
        require: true
    },
    /*
    maths: {
        type:Object,
        marks: {
            type: Array(Number),
            require: true
        }        
    }
    */
    subject: [{
        subjectname: {
            type:String,
        },
        assessment: [{
            type: {
                type: Array(String),
                require: true
            }, 
            score: {
                type: Array(Number),
                require: true
            }, 
            total: {
                type: Array(Number),
                require: true
            }, 
        }],
    }],
    sum_score: {
        type: Number,
        require: true
    }, 
    sum_total: {
        type: Number,
        require: true
    }, 
    /*  
    gendar: {
        type: String,
        require: true
    },   
    birthday: {
        type: Date,
    },
    */
});

module.exports = mongoose.model('Students', StudentSchema);