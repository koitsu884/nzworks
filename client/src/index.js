import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

import { LoadScript } from '@react-google-maps/api'

const apiKey = process.env.REACT_APP_GOOGLEAPI_KEY;
const googleMapsLibraries = ['drawing', 'visualization', 'places']

ReactDOM.render(
    (
        <Provider store={store}>
            <LoadScript
                id='script_loader'
                googleMapsApiKey={apiKey}
                language='ja'
                region='JA'
                // version='weekly'
                // onLoad={onLoad}
                // onError={onError}
                // loadingElement={Loading}
                libraries={googleMapsLibraries}
                preventGoogleFontsLoading
            >
                <App />
            </LoadScript>
        </Provider>
    ),
    document.getElementById('root')
);

