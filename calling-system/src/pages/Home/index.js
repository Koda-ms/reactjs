import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../services/dbConnection';
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { format } from 'date-fns';
import Header from '../../components/Header';
import Title from "../../components/Title";
import Modal from '../../components/Modal';
import './home.css';

const listRef = firebase.firestore().collection('callings').orderBy('created', 'desc').limit(5);

function Home(){
    const[customers, setCustomers] = useState([]);
    const[loadCalls, setLoadCalls] = useState(true);
    //THERE'S A LIMIT SET TO LOAD ONLY A INTERVAL OF CALLS, SO
    //IF THERE'S MORE CALLS TO BE LOADED THIS IS SET TO true
    const[loadMore, setLoadMore] = useState(false);
    //THIS CONST DEFINES IF THE LIST IS EMPTY, BECAUSE IF IT IS
    //THEN IT MEANS THERE'S NO CALL TO BE SEARCHED
    const[isEmpty, setIsEmpty] = useState(false); 
    const[lastDocs, setLastDocs] = useState();

    const[postModal, setPostModal] = useState(false);
    const[itemDetail, setItemDetail] = useState();

    useEffect(() => {

        async function loadCallings(){
            await listRef.get()
            .then((snapshot) => {
                updateCalls(snapshot)
            })
            .catch((error) => {
                console.log(error);
                setLoadCalls(false);
            })
        }
        loadCallings();
    }, []);

    function updateCalls(snapshot){
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty){
            let list = [];

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    clientId: doc.data().clientId,
                    client: doc.data().client,
                    subject: doc.data().subject,
                    status: doc.data().status,
                    created: doc.data().created,
                    formatedDate: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    complement: doc.data().complement
                })
            })
            //THIS SERVES TO SET THE LAST DOC SHOWN ON THE LIST INSIDE THE LIMIT,
            //THEN WHEN ANOTHER LIST GOES TO LOAD THE SERACH IN THE DB WILL 
            //START RIGHT AFTER THIS DOC
            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            //THE SPREAD OPERATOR HELPS BECAUSE IF THE LIST HAS ANY OTHER CALL (...list) THEN,
            //ON THE SEARCH THOSE NEW CALLS ARE SHOWN ALONG WITH THE "OLD" ONES (...customers)
            setCustomers([...customers, ...list]);
            setLastDocs(lastDoc);
            setLoadCalls(false);

        } else {
            setIsEmpty(true);
        }
        setLoadMore(false);
    }

    //CALLED WHEN THERE'S MORE CALLINGS IN THE DB THAT CAN BE SHOWN
    async function handleMore(){
        setLoadMore(true);

        await listRef.startAfter(lastDocs).limit(5).get()
        .then((snapshot) => {
            updateCalls(snapshot);
            console.log(loadMore);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function toggleModal(item){
        setPostModal(!postModal);
        setItemDetail(item);
    }

    if(loadCalls){
        return(
            <div>
                <Header/>

                <div className="content">
                    <Title name='Callings'>
                        <FiMessageSquare size={25}/>
                    </Title>

                    <div className='container dashboard'>
                        <span>Searching calls...</span>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name='Callings'>
                    <FiMessageSquare size={25}/>
                </Title>
                {/* IF THERE'S NO CALLINGS AVAILABLE IN THE SYSTEM */}
                {customers.length === 0 ? (
                   <div className='container dashboard'>
                        <span>No callings found</span>
                        <Link to='/newCall' className='new'>
                            <FiPlus size={25} color='#FFF'/>
                            New Call
                        </Link>
                    </div> 
                ) : (
                    <>
                    <Link to='/newCall' className='new'>
                        <FiPlus size={25} color='#FFF'/>
                        New Call
                    </Link>

                    <table>
                        <thead>
                            <tr>
                                <th scope='col'>Client</th>
                                <th scope='col'>Subject</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Signed in</th>
                                <th scope='col'>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((item, index) => {
                                return(
                                    <tr key={index}>  
                                        <td data-label='Client'>{item.client}</td>
                                        <td data-label='Subject'>{item.subject}</td>
                                        <td data-label='Status'>
                                            <span className='badge' style={{backgroundColor: item.status === 'Open' ? '#5cb85c' : '#999'}}>{item.status}</span>
                                        </td>
                                        <td data-label='Signed in'>{item.formatedDate}</td>
                                        <td data-label='#'>
                                            <button className='action' style={{backgroundColor: '#3583f6'}} onClick={() => toggleModal(item)}>
                                                <FiSearch size={17} color='#FFF'/>
                                            </button>
                                            <Link className='action' style={{backgroundColor: '#F6a935'}} to={`/newCall/${item.id}`}>
                                                <FiEdit2 size={17} color='#FFF'/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    { !loadMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Search more</button> }
                    </>
                )}
                
            </div>

            { postModal && (
                <Modal content={itemDetail}
                close={toggleModal}/>
            )}

        </div>
    );

}

export default Home;