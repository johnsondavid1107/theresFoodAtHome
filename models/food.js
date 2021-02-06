const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, required: true },

});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
