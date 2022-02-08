//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const mongoose = require("mongoose");

// const path = require("path");

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to mongoose

mongoose.connect("mongodb://localhost:27017/moviesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const movieSchema = new mongoose.Schema({
    titles: String,
    genres: String,
    years: String,
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
        years: req.body.yearss,
    });

    newMovie.save();

});

//updating movies from database
app.put("/update/:updateid", function (req, res) {

    const updateMovies = {
        titles: req.body.title,
        genres: req.body.genre,
        years: req.body.year,
    };

    Movie.findByIdAndUpdate({ _id: req.params.updateid }, { $set: updateMovies }, (err) => {
        if (!err) {
            console.log("movie updated");
        } else {
            console.log(err);
        }
    });
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