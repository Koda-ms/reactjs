import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdFlightTakeoff } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addReserveSuccess } from '../../store/modules/reserve/actions';
import api from '../../services/api';
import './home.css'; 

function Home() {
    const[trips, setTrips] = useState([]);
    const[stock, setStock] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadApi(){
            const responseTrip = await api.get('trips');
            const responseStock = await api.get('stock');
          
            setTrips(responseTrip.data);
            setStock(responseStock.data);
        }

        loadApi();
    }, []);

    //THIS FUNCTION SEND AN ACTION TO THE REDUCER.
    //THE dispatch KEEPS THE ACTION CLASSIFIED BY
    //ITS TYPE (STATE) AND THE CONTENT OF ITSELF.
    function handleAdd(trip){
        const stockAmount = stock.find(stock => stock.id === trip.id);
        dispatch(addReserveSuccess(trip, stockAmount));
        navigate('/reservation', {replace: true});
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

                            <button type='button' onClick={()=> handleAdd(trip)}>
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