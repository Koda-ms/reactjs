import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './home.css';
//URL: /movie/now_playing?api_key=fcb240d2b107f9e36208a406880e494f

function Home(){
    const[movies, setMovies] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadApi(){
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: 'fcb240d2b107f9e36208a406880e494f',
                    page: 1,
                }
            })
            //console.log(response);
            setMovies(response.data.results.slice(0, 10)); //'.slice()' ADJUSTS A LIST TO A DESIRED SIZE. IT REALLY TKE A "SLICE" OF
                                                            //THE ENTIRE ARRAY
            setLoading(false);
        }
        
        loadApi();
    }, []);

    //FOR CASES WHEN THE INTERNET IS SLOW OR THE API'S RESPONSE ISN'T FAST
    if(loading){
        return(
            <div className='loading'>
                <h2>Loading movies...</h2>
            </div>
        );
    }

    return(
        <div className='movie-cont'>
            <div className='movie-list'>
                {movies.map((movie) => {
                    return(
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt=''/>
                            <Link to={`/movie/${movie.id}`} className='acc-btn'>Access</Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );

}

export default Home;