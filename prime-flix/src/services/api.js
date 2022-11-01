import axios from 'axios';
//URL BASE: https://api.themoviedb.org/3/
//URL: /movie/550?api_key=fcb240d2b107f9e36208a406880e494f

const api =  axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;