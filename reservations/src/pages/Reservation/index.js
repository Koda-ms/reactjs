import { useSelector, useDispatch } from "react-redux";
import { removeReserve, updateReserveAmount } from "../../store/modules/reserve/actions";
import { MdDelete, MdAddCircle, MdRemoveCircle } from "react-icons/md";
import './reservation.css';

function Reservation() {
    const dispatch = useDispatch();
    const reserves = useSelector((store) => store.rootReducer.reserve);
    
    function handleDelete(id){
        dispatch(removeReserve(id));
    }

    function decrementAmount(trip){
        dispatch(updateReserveAmount(trip.id, trip.amount - 1));
    }

    function incrementAmount(trip){
        dispatch(updateReserveAmount(trip.id, trip.amount + 1));
    }

    return(
        <div>
            <h1 className="title">You selected {reserves.length} reserves</h1>

            {reserves.map(reserve => {
                return(
                    <div className="reserves" key={reserve.id}>
                        <img src={reserve.image}
                        alt={reserve.title}/>
                        <strong>{reserve.title}</strong>
                        <div className="btns">
                            <button type="button" onClick={() => decrementAmount(reserve)}>
                                <MdRemoveCircle size={16}/>
                            </button>
                            <input type='text' readOnly value={reserve.amount}/>
                            <button type="button" onClick={() => incrementAmount(reserve)}>
                                <MdAddCircle size={16}/>
                            </button>
                        </div>
                        <button type='button' onClick={()=> handleDelete(reserve.id)}>
                            <MdDelete size={20} color='#191919'/>
                        </button>
                    </div>
                );
            })}
            <footer>
                <button type="button">Make Reservation</button>
            </footer>
        </div>
    );
}

export default Reservation;