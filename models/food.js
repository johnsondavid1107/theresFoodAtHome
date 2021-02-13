const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema([{
  name: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dateOfPurchase: {
    type: Date
  },
  daysFresh: {
    type: Number
  },
  spoiled: {
    type: Boolean
  },
  location: {
    type: String
  }


}]);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
