const Schema = require("mongoose").Schema;

const userSchema = new Schema({
  email: { type: String, trim: true, required: true, validate: [] },
  userName: { type: String },
  userId: { type: String, trim: true, required: true },
  password: { type: String },
  reports: [{ type: Object }],
});

module.exports = userSchema;
