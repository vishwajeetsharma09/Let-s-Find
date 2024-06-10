const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 3000;

// creating path form another folder and files
const Listing = require("./models/listing.js");

// creating connection to database
let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Routing
app.get("/", (req, res) => {
  res.send("app is working");
});

app.get("/testlisting", async (req, res) => {
  let sampleListing = new Listing({
    title: "my new villa",
    description: "By the beach",
    price: 1200,
    location: "goa",
    country: "india",
  });
  await sampleListing
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

//listening port
app.listen(port, () => {
  console.log(`server is working on ${port}`);
});
