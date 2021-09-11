import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

    //useState for reading from database
    const [movies, setMovies] = useState([{
        titlez: "",
        genrez: "",
        yearz: ""
    }])

    //useState for adding movies to the database
    const [addMovies, setAddMovies] = useState({
        title: "",
        genre: "",
        year: ""
    })

    useEffect(function () {

        // fetching/getting the movies data from the database
        fetch("/movies").then(function (res) {
            if (res.ok) {
                return res.json()
            }
        }).then(myjasonResult => setMovies(myjasonResult))
    })

    function handleChange(event) {
        const { name, value } = event.target;

        setAddMovies(function (prevInput) {
            return (
                {
                    ...prevInput, [name]: value
                }
            );
        })
    }

    function addMovie(event) {
        event.preventDefault();

        const newMovie = {
            titless: addMovies.title,
            genress: addMovies.genre,
            yearss: addMovies.year
        }
        axios.post("/newmovie", newMovie);

        alert("movie added");

        setAddMovies({
            title: "",
            genre: "",
            year: ""
        });

    }

    function deleteMovie(deleteId) {
        axios.delete("/deletemovie/" + deleteId);
        alert("movie deleted");
    }

    return (

        <div>

            <h1>Add Movie</h1>

            <form>
                <input onChange={handleChange} autoComplete="off" name="title" value={addMovies.title}></input>
                <input onChange={handleChange} autoComplete="off" name="genre" value={addMovies.genre}></input>
                <input onChange={handleChange} autoComplete="off" name="year" value={addMovies.year}></input>
                <button onClick={addMovie}>ADD MOVIE</button>
            </form>

            {/* reading from database */}
            {movies.map(function (eachMovie) {
                return (
                    <div>
                        <h1>{eachMovie.titles}</h1>
                        <p>{eachMovie.genres}</p>
                        <p>{eachMovie.years}</p>
                        {/* the "_id" comes from the mongo database */}
                        <button onClick={function () { deleteMovie(eachMovie._id) }}>DELETE</button>
                    </div>
                );
            })}

        </div>
    );


}

export default App;