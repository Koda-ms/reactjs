import produce from 'immer';

export default function reserve( state = [], action ){
 
    switch (action.type) {
        case 'ADD_RESERVE_SUCCESS':

            //THE produce HELPS ON WORKING WITH STATES' VALUES.
            //draft IS A COPY FROM THE BASE STATE AND WITH IT IT'S
            //POSSIBLE TO WORK WITH IMMUTABLE STATES.
            return produce(state, draft => {
                const tripIndex = draft.findIndex(trip => trip.id === action.trip.id);

                if(tripIndex >= 0){
                    draft[tripIndex].amount++;
                } else {
                    draft.push({
                        ...action.trip,
                        amount: 1
                    });
                }
            });
        
        case 'REMOVE_RESERVE':
            return produce(state, draft => {
                const tripIndex = draft.findIndex(trip => trip.id === action.id);
            
                if(tripIndex >= 0){
                    //splice(index, first object)
                    draft.splice(tripIndex, 1);
                }
            });

        case 'UPDATE_AMOUNT': {
            if(action.amount <= 0){
                return state;
            }

            return produce(state, draft => {
                const tripIndex = draft.findIndex(trip => trip.id === action.id);
            
                if(tripIndex >= 0){
                    draft[tripIndex].amount = Number(action.amount);
                }
            });
        }
        default:
            return state;
    }
}