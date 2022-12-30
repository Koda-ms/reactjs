import { all, call, put, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess } from './actions';
import api from '../../../services/api';

// * REPRESENTS THE GENERAL OPERATOR THAT IS STRONGER THAN async ITSELF.
// yield <==> await
function* addToReserve({ id }){
    const response = yield call(api.get, `trips/${id}`);

    yield put(addReserveSuccess(response.data))
}

export default all([
    // takeLatest MEANS THAT ONLY THE LAST CLICK WILL 
    // BE TAKEN TO WORK ON IT.
    takeLatest('ADD_RESERVE_REQUEST', addToReserve)
])