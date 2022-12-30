import { useState, useEffect } from 'react';
import { MdFlightTakeoff } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addReserveRequest } from '../../store/modules/reserve/actions';
import api from '../../services/api';
import './home.css'; 

function Home() {
    const[trips, setTrips] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadApi(){
            const response = await api.get('trips');
          
            setTrips(response.data);
        }

        loadApi();
    }, []);

    //THIS FUNCTION SEND AN ACTION TO THE REDUCER.
    //THE dispatch KEEPS THE ACTION CLASSIFIED BY
    //ITS TYPE (STATE) AND THE CONTENT OF ITSELF.
    function handleAdd(id){
        dispatch(addReserveRequest(id));
    }

    return(
        <div className='box'>
            {trips.map(trip => {
                return(
                    <ul key={trip.id}>
                        <li>
                            <img src={trip.image} alt=''/> 
                            <strong>{trip.title}</strong>
                            <span>Status: {trip.status ? 'Available' : 'Unavailable'}</span>

                            <button type='button' onClick={()=> handleAdd(trip.id)}>
                                <div>
                                    <MdFlightTakeoff color= '#fff' size={14}/>
                                </div>
                                <span>MAKE RESERVATION</span>
                            </button>
                        
                        </li>
                    </ul>
                );
            })}
        </div>

    );
}

export default Home;