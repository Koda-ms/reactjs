import produce from 'immer';

export default function reserve( state = [], action ){

    switch (action.type) {
        case 'ADD_RESERVE_SUCCESS':
            
            //THE produce HELPS ON WORKING WITH STATES' VALUES.
            //draft IS A COPY FROM THE BASE STATE AND WITH IT IT'S
            //POSSIBLE TO WORK WITH IMMUTABLE STATES.
            return produce(state, draft => {
                
                const tripIndex = draft.findIndex(trip => trip.id === action.trip.id);

                if(tripIndex < 0){
                    draft.push({
                        ...action.trip,
                        amount: 1
                    });
                } else {
                    //HERE THE ALERT APPEARS AT THE 3RD CLICK
                    draft[tripIndex].amount++;
                }
                
                const stockAmount = action.stockAmount.amount;

                const currentStock = tripIndex >= 0 ? draft[tripIndex].amount : 0;

                const amount = currentStock + 1;

                if(amount > stockAmount){
                    alert('Maximum quantity reached.');
                    return;
                }
                //HERE THE ALERT APPEARS AT THE 4TH CLICK
                // if(tripIndex >= 0){
                //   draft[tripIndex].amount++;
                // }
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
                const stockAmount = action.stockAmount.amount;
           
                const amount = action.amount;
        
                if(amount > stockAmount){
                    alert('Maximum quantity reached.');
                    return;
                }

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