/**
 * Title: app.js
 * Author: Professor Krasso
 * Date: 4th December 2020
 * Modified By: King Major
 * Description: Creating express server, establishing MongoDb connection, and defining api route to find empoyees by Id
 */

/**
 * Require statements
 */
const express = require('express')
// const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const Employee = require('./server/db-models/employee')

/**
 * App configurations
 */
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, './dist/nodebucket')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(path.dirname + '/dist/nodebucket/index.html'))
})

/**
 * Variables
 */
// const port = process.env.port || 3000 // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://admin:admin@buwebdev-cluster-1.ap9uz.mongodb.net/nodebucket?retryWrites=true&w=majority'

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
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
 *  API: FindEmployeeById
 *  Returns: Identifies employee by their listed id number
 */
app.get('/api/employees/:empId', function (req, res, next) {
  Employee.findOne({ empId: req.params.empId }, function (err, employee) {
    if (err) {
      console.log(err)
      return next(err)
    } else {
      console.log(employee)
      res.json(employee)
    }
  })
})

/**
 *  API: FindAllTasks
 *  Returns: Array of todo and done items
 */
app.get('/api/employees/:empId/tasks', function (req, res, next) {
  Employee.findOne({ empId: req.params.empId }, 'empId todo done', function (err, tasks) {
    if (err) {
      console.log(err)
      return next(err)
    } else {
      console.log(tasks)
      res.json(tasks)
    }
  })
})

/**
 *  API: CreateTask
 *  Returns: Update employee record
 */
app.post('/api/employees/:empId/tasks', function (req, res, next) {
  Employee.findOne({ empId: req.params.empId }, function (err, employee) {
    if (err) {
      console.log(err)
      return next(err)
    } else {
      console.log(err)

      const item = {
        text: req.body.text
      }
      employee.todo.push(item) // because adding more than one line(whole document)
      employee.save(function (err, employee) {
        if (err) {
          console.log(err)
          return next(err)
        } else {
          console.log(employee)
          res.json(employee)
        }
      })
    }
  })
})

/**
 *  API: UpdateTasks
 *  Returns: Update employee record
 */
app.put('/api/employees/:empId/tasks', function (req, res, next) {
  Employee.findOne({ empId: req.params.empId }, function (err, employee) {
    if (err) {
      console.log(err)
      return next(err)
    } else {
      console.log(employee)

      employee.set({
        todo: req.body.todo,
        done: req.body.done
      })
      employee.save(function (err, employee) {
        if (err) {
          console.log(err)
          return next(err)
        } else {
          console.log(employee)
          res.json(employee)
        }
      })
    }
  })
})

/**
 *  API: DeleteTasks
 *  Returns: Update employee record
 */
app.delete('/api/employees/:empId/tasks/:taskId', function (req, res, next) {
  Employee.findOne({ empId: req.params.empId }, function (err, employee) {
    if (err) {
      console.log(err)
      return next(err)
    } else {
      console.log(employee)

      const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId)
      const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId)

      /**
     * If the todoItem is not null, then we know the item being deleted is a todoTask
     */

      if (todoItem) {
        employee.todo.id(todoItem._id).remove()
        employee.save(function (err, emp1) {
          if (err) {
            console.log(err)
            return next(err)
          } else {
            console.log(emp1)
            res.json(emp1)
          }
        })
      } else if (doneItem) {
        /**
        * If the doneItem is not null, then we know the item being deleted is a doneTask
        */
        employee.done.id(doneItem._id).remove()
        employee.save(function (err, emp2) {
          if (err) {
            console.log(err)
            return next(err)
          } else {
            console.log(emp2)
            res.json(emp2)
          }
        })
      } else {
        /**
         * Otherwise, the item does not belong to either collection and we should return a message to the user
         */
        console.log(`Unable to locate task: ${req.params.taskId}`)
        res.status(200).send({ type: 'warning', text: `Unable to locate task: ${req.params.taskId}` })
      }
    }
  })
})

/**
 * Create and start server
 */
app.listen(process.env.PORT || 3000, function () {
  console.log('Application started and listening on port: 3000')
}) // end http create server function
