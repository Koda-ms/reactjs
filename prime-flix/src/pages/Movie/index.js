import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './movie.css';

function Movie(){
    const { id } = useParams();
    const navigate = useNavigate();
    const[movie, setMovie] = useState({});
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovie(){
            await api.get(`movie/${id}`, {
                params: {
                    api_key: 'fcb240d2b107f9e36208a406880e494f'
                }
            })
            .then((response => {
                setMovie(response.data);
                setLoading(false);
            }))
            .catch(() => {
                navigate('/', { replace: true });
                return;
            })
        }
        loadMovie();
    }, [id, navigate]);

    if(loading){
        return(
            <div className='load-movie'>
                <h2>Loading movie...</h2>
            </div>
        );
    }

    function saveMovie(){
        const myList = localStorage.getItem("@primeflix");

        let savedMovie = JSON.parse(myList) || [];
        
        const hasMovie = savedMovie.some((savedMovie) => savedMovie.id === movie.id)
    
        if(hasMovie){
            alert("FILME JÁ EXISTE NA LISTA");
            return;
        }

        savedMovie.push(movie);
        localStorage.setItem("@primeflix", JSON.stringify(savedMovie));
        alert("FILME SALVO COM SUCESSO")
    }

    return(
        <div key={movie.id} className='movie-details'>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt=''/>
            <h3>Synopsis</h3>
            <span>{movie.overview}</span>

            <div>
                <h4>Popularity: {movie.popularity}</h4>
                <h4 className='note'>Note: {movie.vote_average.toFixed(1)} / 10</h4>
            </div>
            
            <div className='btn-area'>
                <button onClick={saveMovie}>Save</button>
                <button><a target='blank' rel='external' href={`https://youtube.com/results?search_query=${movie.title} trailer`}>Trailer</a></button>
            </div>

        </div>
    );

}

export default Movie;