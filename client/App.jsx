import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import allReducers from './reducers/index';
import Index from './pages/index';
import {composeWithDevTools} from 'redux-devtools-extension';
import moment from 'moment';
moment.locale('fr');
const store = createStore(
    allReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Index/>
    </Provider>
    , document.getElementById('app')
);
