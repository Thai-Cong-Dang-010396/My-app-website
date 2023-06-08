import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, connect } from 'react-redux';
import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from '@reduxjs/toolkit';

import rootReducer from './redux/reducers';
import App from './App';

const store = configureStore({
    reducer: rootReducer
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);