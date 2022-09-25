var express = require('express')
var app = express()
var cors = require('cors')
const mongoose = require('mongoose')
const Expense = require('./model')
const {body, validationResult} = require('express-validator')
var path = require('path')

mongoose.connect("mongodb+srv://ken:5HnEo4htJKUPSyu4@myexpense.ncjhtxe.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(() => console.log('database connect successfully'))
.catch((err) => console.log(err))


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../build')))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../build/index.html"))
    })
}

app.post('/insert', body('date').notEmpty() , (req, res) => {
    const {date, list, month, expense, year} = req.body
    const errors = validationResult(req);

    if(!errors.isEmpty() || Object.keys(list).length === 0 || Object.keys(expense).length === 0){  
        res.json({status: 'errors'})
    }else{
        var insertData = new Expense({
            date: date,
            list: list,
            month: month,
            year: year,
            expense: expense,
        })
        
        insertData.save()
        res.json({status: 'ok'})
        
    }
    
})


function isEmpty(obj) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

app.post('/edit', (req, res) => {
    const { id, list, expense } = req.body
    if(isEmpty(list) || isEmpty(expense)){
        Expense.findById(id).exec((err, lists) => {
            if(lists.length == 0){
                res.json({message: "no data of this month", status: "fail"})
            }else{
                res.json({data: lists, status: "complete"})
    
            }
        })

    }else{
        Expense.findByIdAndUpdate(id, { list: {...list}, expense: {...expense}}, () => {
            res.json({message: 'change data successfully', status: 'complete'})
        });
    }
    
 })

app.post('/table', (req,res) => {
    var { month, year } = req.body
    Expense.find({month: month, year: year}).sort({date: 1}).exec((err, expense) => {
        if(expense.length == 0){
            res.json({message: "no data of this month", status: "fail"})
        }else{
            res.json({data: expense, status: "complete"})

        }
    })
})

app.post('/delete', (req,res) => {
    const { id } = req.body
    Expense.findByIdAndDelete(id, () => {
        res.json({message: 'delete data successfully', status: 'complete'})
    });
})



app.listen(5000, () => console.log('server is connected'))