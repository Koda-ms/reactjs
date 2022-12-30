import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

// CREATE THE SAGA MIDDLEWARE
const sagaMiddleware = createSagaMiddleware();

// MOUNT THE MIDDLEWARE ON STORE.
// THE UPDATE FROM createStore, configureStore, HANDLES INTERNALLY WITH IMPORTS
// FROM 'redux' SUCH AS createStore, compose, applyMiddleware, ETC...
const store = configureStore({
    reducer: {
        rootReducer,
    },
    // getDefaultMiddleware IS USEFUL TO ADD SOME CUSTOM MIDDLEWARE, BUT ALSO TO
    // KEEP THE DEFAULT MIDDLEWARE ADDED AS WELL
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

// THEN RUN THE SAGA
sagaMiddleware.run(rootSaga);

export default store;