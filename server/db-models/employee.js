/**
 * Title: employee.js
 * Author: Professor Krasso
 * Date: 4th December 2020
 * Modified By: King Major
 * Description: Mongoose employee document model
 */

const mongoose = require('mongoose')
const Item = require('./item')

// Defining db schema
const employeeSchema = mongoose.Schema({
  empId: { type: String, unique: true, dropDups: true },
  firstname: { type: String },
  lastname: { type: String },
  todo: [Item],
  done: [Item]
})

module.exports = mongoose.model('Employee', employeeSchema)
