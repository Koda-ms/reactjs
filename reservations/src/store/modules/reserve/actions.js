//IN CASE A COMPLEX APPLICATION IS BUILT AND, THEREFORE,
//NEEDS TO MAKE MORE ACTIONS, THE FUNCTION REPONSIBLE FOR
//ITS DISPATCHES WOULD BE OVERLOADED AND DISORGANIZED. FOR
//THIS REASON, THIS SEPARATED FILE WAS CREATED.

export function addReserveRequest(id){
    return {
        type: 'ADD_RESERVE_REQUEST',
        id
    };
}

export function addReserveSuccess(trip){
    return {
        type: 'ADD_RESERVE_SUCCESS',
        trip
    };
}

export function removeReserve(id){
    return {
        type: 'REMOVE_RESERVE',
        id
    };
}

export function updateReserveAmount(id, amount){
    return{
        type: 'UPDATE_AMOUNT',
        id,
        amount
    };
}