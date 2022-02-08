import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

    //useState for reading from database
    const [movies, setMovies] = useState([{
        titles: "",
        genres: "",
        years: "",
        _id: "",
    }]);

    //useState for adding movies to the database
    const [addMovies, setAddMovies] = useState({
        title: "",
        genre: "",
        year: "",
        _id: "",
    });

    //useState for switching the form when the update button is clicked
    const [switchForm, setSwitchForm] = useState(false);

    //useState for updating movies in the database
    const [updateMovies, setUpdateMovies] = useState({
        title: "",
        genre: "",
        year: "",
        id: "",
    });

    useEffect(function () {

        // fetching/getting the movies data from the database
        fetch("/movies").then(function (res) {
            if (res.ok) {
                return res.json()
            }
        }).then(myjasonResult => setMovies(myjasonResult))
    }, [movies]);

    function handleChangeAddMovies(event) {
        const { name, value } = event.target;

        setAddMovies(function (prevInput) {
            return {
                ...prevInput, [name]: value
            };

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

    function handleChangeUpdateMovies(event) {
        const { name, value } = event.target;

        setUpdateMovies(function (prevInput) {
            return {
                ...prevInput, [name]: value,
            };

        });
        console.log(updateMovie);
    }

    function openUpdateMovies(openUpdateid, openUpdatetitle, openUpdategenre, openUpdateyear) {
        setSwitchForm(true);
        setUpdateMovies(function (prevInput) {
            return {
                ...prevInput,
                id: openUpdateid,
                title: openUpdatetitle,
                genre: openUpdategenre,
                year: openUpdateyear,
            };

        });

    }

    function updateMovie(updateid) {

        axios.put("/update/" + updateid, updateMovies);
        alert("movie updated");
        console.log(`movie with id ${updateid} updated `);

    }


    function deleteMovie(deleteId) {
        axios.delete("/deletemovie/" + deleteId);
        alert("movie deleted");
    }

    return (

        <div>


            {!switchForm ? (
                <>
                    <h1>Add Movie</h1>
                    <form>
                        <input onChange={handleChangeAddMovies} placeholder="title" autoComplete="off" name="title" value={addMovies.title}></input>
                        <input onChange={handleChangeAddMovies} placeholder="genre" autoComplete="off" name="genre" value={addMovies.genre}></input>
                        <input onChange={handleChangeAddMovies} placeholder="year" autoComplete="off" name="year" value={addMovies.year}></input>
                        <button onClick={addMovie}>ADD MOVIE</button>
                    </form>

                    {movies.map(function (eachMovie) {
                        return (
                            <div key={eachMovie._id}>
                                <h1>{eachMovie.titles}</h1>
                                <p>{eachMovie.genres}</p>
                                <p>{eachMovie.years}</p>
                                {/* the "_id" comes from the mongo database */}
                                <button onClick={() => openUpdateMovies(eachMovie._id, eachMovie.titles, eachMovie.genres, eachMovie.years)}>UPDATE</button>
                                <button onClick={() => deleteMovie(eachMovie._id)}>DELETE</button>
                            </div>
                        );
                    })}

                </>) : (<>
                    <h1>Update Movie {updateMovies.title}</h1>
                    <form>
                        <input onChange={handleChangeUpdateMovies} placeholder="title" autoComplete="off" name="title" value={updateMovies.title}></input>
                        <input onChange={handleChangeUpdateMovies} placeholder="genre" autoComplete="off" name="genre" value={updateMovies.genre}></input>
                        <input onChange={handleChangeUpdateMovies} placeholder="year" autoComplete="off" name="year" value={updateMovies.year}></input>
                        <button onClick={() => updateMovie(updateMovies.id)}>UPDATE MOVIE</button>
                    </form>
                </>)}



        </div>
    );


}

export default App;