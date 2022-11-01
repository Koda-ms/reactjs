import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favs.css';

function Favorites(){
    const[movies, setMovies] = useState([]);

    useEffect(() => {
        const movieList = localStorage.getItem("@primeflix");
        setMovies(JSON.parse(movieList) || []);
        
    }, []);

    function removeMovie(movieId){
        //THIS FIRST LOGIC REMOVES THE MOVIE FROM THE STATE
        let filteredMovies = movies.filter((movie) => {
            return(movie.id !== movieId);
        });
        setMovies(filteredMovies);
        localStorage.setItem("@primeflix", JSON.stringify(filteredMovies));

        toast.success("Movie removed successfully");
    }

    return(
        <div className='my-movies-container'>
            <h1>My Movies</h1>
            {movies.length === 0 && <span>You don't have movies saved</span>}
            <ul>
                {movies.map((movie) => {
                    return(
                        <li key={movie.id}>
                            <span>{movie.title}</span>
                            <div>
                                <Link to={`/movie/${movie.id}`}>View Details</Link>
                                <button onClick={() => removeMovie(movie.id)}>Remove</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            
        </div>
    );

}

export default Favorites;