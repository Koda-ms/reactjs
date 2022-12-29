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
    //THIS const CONTROLS THE PAGES. SO, IT'S SETTLE TO 1, BECAUSE IT'S
    //THE 1ST PAGE OF ISSUES. IT'S THE DEFAULT.
    const[page, setPage] = useState(1);
    //RENDERS THE BUTTON IN ONE TAGE
    const[filterIssue, setFilterIssue] = useState([
        {state: 'all', label: 'All issues', active: true},
        {state: 'open', label: 'Open', active: false},
        {state: 'closed', label: 'Closed', active: false}
    ]);
    const[filterIndex, setFilterIndex] = useState(0);

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
                        state: filterIssue.find(f => f.active).state,
                        per_page: 5
                    }
                })
            ]);
            setRepo(repositoryData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }
        loadRepo();
    }, [repository, filterIssue]);

    //THIS HOOK UPDATES THE ISSUE LIST ONCE ANY OF THE BUTTONS 'NEXT'
    //OR 'BACK' ARE CLICKED.
    useEffect(() => {

        async function loadIssues(){
            const repoName = decodeURIComponent(repository);

            const response = await api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: filterIssue[filterIndex].state,
                    page: page,
                    per_page: 5,
                },
            });
            setIssues(response.data);
        }

        loadIssues();
    }, [repository, filterIssue, filterIndex, page]);

    //THIS UPDATES THE STATE page SO IT MAY MOVE TO NEXT ONE
    //OR GO BACK TO THE PREVIOUS
    function handlePage(action){
        setPage(action === 'next' ? page + 1 : page - 1);
    }

    function handleFilter(e){
        setFilterIndex(e.target.value);
    }

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

            <div className="issue-filter">
                {/* {filterIssue.map((filter, index) => {
                    return(
                        <button type="button" key={filter.label}
                        active={filterIndex}
                        onClick={() => handleFilter(index)}>
                            {filter.label}
                        </button>
                    );
                })} */}
                <select value={filterIndex} onChange={handleFilter}>
                {filterIssue.map((filter, index) => {
                    return(
                        <option key={filter.label} value={index}>
                            {filter.label}
                        </option>
                    );
                })}
                </select>
            </div>
            
            {issues.map((issue) => {
                return(
                    <ul className="repo-list">
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login}/>

                            <div className="issue-text">
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    
                                    {issue.labels.map((label) => {
                                        return(
                                            <span key={String(label.id)}>{label.name}</span>
                                        )
                                    })}
                                </strong>

                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    </ul>
                );
            })}
            <div className="action">
                <button type="button" 
                onClick={() => handlePage('back')}
                disabled={page < 2}>Back</button>

                <button type="button" 
                onClick={() => handlePage('next')}>Next</button>
            </div>
        </div>
    );
}

export default Repository;