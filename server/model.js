const mongoose = require('mongoose')
const { Schema } = mongoose

const allexpense = new Schema({
    date: String,
    month: String,
    year: String,
    list: {},
    expense: {},
})

const Expense = mongoose.model('Expense', allexpense) 

module.exports = Expense