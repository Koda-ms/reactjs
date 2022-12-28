import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';
import './repository.css';

function Repository(){
    //THE useParams TAKES THE PARAMETER ON THE URL.
    //'repository' IS THE PARAMETER NAME SET ON THE ROUTE IN App.js.
    const { repository } = useParams();
    const[repo, setRepo] = useState({});
    const[issues, setIssues] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadRepo(){
            const repoName = decodeURIComponent(repository);

            //HERE TWO REQUESTS ARE BEING MADE TO THE SAME URL, SO TO NOT
            //REPEAT THE STRUCTURE TWICE, THE Promise.all WORKS FINE. THE
            //STRUCTURE IS MINOR AND IT RETURNS AN ARRAY WITH THE 2 RESPONSES
            const[repositoryData, issuesData] = await Promise.all([
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                })
            ]);
            setRepo(repositoryData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }
        loadRepo();
    }, [repository]);

    if(loading){
        return(
            <h1 className='loading'>Loading...</h1>
        );
    }

    return(
        <div className="container">
            <Link to='/'>
                <FaArrowLeft color="#000" size={30}/>
            </Link>
            <header>
                <img src={repo.owner.avatar_url} alt={repo.owner.description}/>
                <h1>{repo.name}</h1>
                <p>{repo.description}</p>
            </header>
        </div>
        
    );

}

export default Repository;