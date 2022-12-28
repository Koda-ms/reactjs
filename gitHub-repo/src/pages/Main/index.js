import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import './main.css';

function Main(){
    const[repos, setRepos] = useState([]);
    const[newRepo, setNewRepo] = useState('');
    const[loading, setLoading] = useState(false);

    //TO SEARCH FOR (AND MOUNT) REPOSITORIES THAT ALREADY EXISTS IN LOCALSTORAGE
    useEffect(() => {
        const existedRepo = localStorage.getItem("@repositories");
        
        if(existedRepo){
           setRepos(JSON.parse(existedRepo)); 
        }
    }, []);

    //FUNCTION CALLED TO SUBMIT THE REPOS AND ADD THEM IN THE REPO LIST.
    //THE useCallBack IS USED HERE BECAUSE THE TREATMENT IS MADE WITH STATES,
    //SO IN THIS CASE THE STATES ARE NOT JUST BEING UPDATED, BUT WE'RE WORKING
    //WITH THE SATETES' VALUES BY MANIPULATING AND USING THE VALUES. SO, THE 
    //useCallBack IS ONLY RENDERED IF ANY STATES ARE CHANGED.
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        
        async function submit(){
            setLoading(true);

            try {

                if(newRepo === ''){
                    alert("Please, you must type a repository.");
                    throw new Error('You must add a repository.');
                }

                const response = await api.get(`repos/${newRepo}`);
            
                const duplicated = repos.find(repository => repository.name === newRepo);
               
                if(duplicated){
                    alert("Repository already added.");
                    throw new Error('Repository already added');
                }

                const data = {
                    id: response.data.id,
                    name: response.data.full_name,
                }

                setRepos([...repos, data]);

                localStorage.setItem("@repositories", JSON.stringify([...repos, data]));
                setNewRepo('');

            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false);
            }
        }
        submit();
        
    }, [newRepo, repos]);

    function handleInputSubmit(e){
        setNewRepo(e.target.value);
    }

    //IN THIS CASE, THE FUNCTION RECEIVES THE REPO TO BE DELETED
    //AND SEARCHES, IN THE REPOS LIST, FOR ANY OTHER DIFFERENT
    //FROM IT. ONCE IT'S FOUNDED, THE LIST IS FILLED BY THEM, LEAVING
    //REPO PASSED AS PARAMETER OUT.
    const handleDelete = useCallback((repo) =>{
        let find = repos.filter((r) => { return(r.id !== repo) });
        setRepos(find);

        localStorage.setItem("@repositories", JSON.stringify(find));

    }, [repos]);

    return(
        <div className='container'>
            <h1>
                <FaGithub size={25}/>
                My Repositories
            </h1>

            <form className='form' onSubmit={handleSubmit}>
                <input type='text' placeholder='Add repositories'
                value={newRepo}
                onChange={handleInputSubmit}/>

                <button type='submit'>
                    {loading ? (
                        <FaSpinner className='i-spinner' color='#FFF' size={14}/>
                    ) : (
                        <FaPlus color='#fff' size={14}/>
                    )}
                </button>
            </form>

            {repos.map((repo) => {
                return(
                    <ul key={repo.id} className='repo-list'>
                        <li>
                            <span>
                                <button className='trash-btn' onClick={() => handleDelete(repo.id)}>
                                    <FaTrash size={14}/>
                                </button>
                                {repo.name}
                            </span>
                            {/*USING encodeURIComponent() ON AN URL MEANS THAT A PARAMETER 
                            IS BEING SPECIFIED, SO WITH IT THE repo.name IS READ AS folder/params */}
                            <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                                <FaBars size={14}/>
                            </Link>
                        </li>
                    </ul>
                );
            })}

        </div>
    );

}

export default Main;