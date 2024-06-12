const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

// views path for exporting file
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const port = 3000;

// creating path form another folder and files
const Listing = require("./models/listing.js");

// creating connection to database
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

// Routing
app.get("/", (req, res) => {
  res.send("app is working");
});

//listings routing all the data  // index route also
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// create new route for addign new data
app.get("/listings/new", async (req, res) => {
  // const listing = await Listing.findById(id);
  res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//crate route for new.ejs when we click the should be saved
app.post("/listings", async (req, res) => {
  //  let {title,description,price,image,location,country}= req.body;
  // let listing = req.body.listing;
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  // console.log(newListing);
  res.redirect("/listings");
});

// edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  // console.log(listing);
  res.render("listings/edit.ejs", { listing });
});

// update the edit part into database
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  console.log(Listing);
  res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedList = await Listing.findByIdAndDelete(id);
  // console.log(deletedList);
  res.redirect("/listings");
});

// res.send("app is working");

// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "my new villa",
//     description: "By the beach",
//     price: 1200,
//     location: "goa",
//     country: "india",
//   });
//   await sampleListing
//     .save()
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//listening port
app.listen(port, () => {
  console.log(`server is working on ${port}`);
});
