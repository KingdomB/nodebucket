/**
 * Title: app.js
 * Author: Professor Krasso
 * Date: 4th December 2020
 * Modified By: King Major
 * Description: Creating express server, establishing MongoDb connection, and defining api route to find   empoyees by Id
 */

/**
 * Require statements
 */
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const Employee = require('./db-models/employee')

/**
 * App configurations
 */
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')))

/**
 * Variables
 */
const port = 3000 // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://admin:admin@buwebdev-cluster-1.ap9uz.mongodb.net/nodebucket?retryWrites=true&w=majority'

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug('Connection to the database instance was successful')
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}) // end mongoose connection

/**
 * API(s) go here...
 *
 */

/**
 * Find Employee by Id
 */
app.get('/api/employees/:empId', function (req, res, next) {
  Employee.findOne({ empId: req.params.empId }, function (err, employees) {
    if (err) {
      console.log(err)
      return next(err)
    } else {
      console.log(employees)
      res.json(employees)
    }
  })
})

/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`)
}) // end http create server function
