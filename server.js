const express = require("express");
const db = require("./models")

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/find", function (req, res) {
  db.User.find({ fireBaseId: 1 })
    // .populate("foodItem")
    .then(response => res.json(response))
})

app.post("/addFood", function (req, res) {
  // db.User.create({
  //   name: "Stew",
  //   dateOfPurchase: null,
  //   daysFresh: 5,
  //   spoiled: false,
  //   location: "fridge"
  // }).then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }


})

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/theresfoodathome", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', ()=>{console.log("SUCCESSFULLY CONNECTED TO DB")})
mongoose.connection.on('error', ()=>{console.log("Error connecting to mongo database")})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
