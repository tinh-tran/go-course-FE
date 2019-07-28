import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './config';
import 'antd/dist/antd.css';
import configureStore from './store';
import Main from './contain/Main';
import { PersistGate } from 'redux-persist/lib/integration/react';

let { store, persistor } = configureStore();

ReactDOM.render(
    <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Main />           
            </BrowserRouter>
        </PersistGate>
    </Provider>, 
    document.getElementById('root')
);

