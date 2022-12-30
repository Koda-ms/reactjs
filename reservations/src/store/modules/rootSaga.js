import { all } from 'redux-saga/effects';
import reserve from "./reserve/reducer";

export default function* rootSaga(){
    return yield all([
        reserve,
    ])
}