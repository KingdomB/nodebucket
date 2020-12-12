/**
 * Title: item.js
 * Author: Professor Krasso
 * Date: 7th December 2020
 * Modified By: King Major
 * Description: Mongoose tasks document model
 */

const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  text: { type: String }
})

module.exports = itemSchema
