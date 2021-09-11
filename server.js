//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const mongoose = require("mongoose");

const path = require("path");

const app = express();

app.use(bodyParser.json());

app.use(cors());

// connect to mongoose

mongoose.connect("mongodb://localhost:27017/moviesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const movieSchema = new mongoose.Schema({
    titles: String,
    genres: String,
    years: String
});

const Movie = mongoose.model("Movie", movieSchema);

// API routes

//reading from database
app.get("/movies", function (req, res) {
    Movie.find().then(allMovies => res.json(allMovies));
});

//adding movies to database
app.post("/newmovie", function (req, res) {
    const newMovie = new Movie({
        titles: req.body.titless,
        genres: req.body.genress,
        years: req.body.yearss
    });

    newMovie.save();

});

//deleting movies from database
app.delete("/deletemovie/:deleteId", function (req, res) {
    Movie.findByIdAndDelete({ _id: req.params.deleteId }, function (err) {
        if (!err) {
            console.log("movie deleted");
        } else {
            console.log(err);
        }
    });
});

app.listen(5000, function () {
    console.log("express is running");
});