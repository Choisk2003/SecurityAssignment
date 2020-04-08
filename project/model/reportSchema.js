const Schema = require("mongoose").Schema;

const reportSchema = new Schema({
  bookTitle: { type: String, required: true },
  writer: { type: Sting },
  reportTitle: { type: String },
  report: { type: String },
});

module.exports = reportSchema;
