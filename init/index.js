const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
let MONGO_URL =
  "mongodb+srv://site:site@cluster0.idft8qs.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0";

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

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was inilized");
};

initDB();
