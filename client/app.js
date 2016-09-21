import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';
import fetch        from 'isomorphic-fetch';
import { StyleRoot } from 'radium';
// import cookie       from 'cookie';
import { Router, browserHistory } from 'react-router';
// import configureStore from '../shared/store/configureStore';
import routes         from '../shared/routes.js';
import i18n           from '../shared/i18n';

const DEFAULT_LOCALE = 'en';

const initialState = window.__INITIAL_STATE__ || {};

const store = {
    subscribe: (function(){}),
    dispatch: (function(){}),
    getState: (function(){})
};// configureStore();


// const locale = cookie.parse(document.cookie).locale || DEFAULT_LOCALE;

// function loadLocale(localeToLoad) {
//     if (localeToLoad === 'en') {
//         // No need to load as UI already in English
//         return Promise.resolve({});
//     }


//     // "": { "domain": "messages", "lang": "" }
//     return fetch(`/static/lang/${localeToLoad}.json`).then(res => {
//         if (res.status >= 400) {
//             throw new Error('Bad response from server');
//         }

//         return res.json();
//     });
// }

// loadLocale(locale).then(localeData => {
    const i18nTools = new i18n.Tools({localeData: {}, locale: 'en' });

    ReactDOM.render(
        <Provider store={store}>
          <StyleRoot>
            <i18n.Provider i18n={i18nTools}>
              <Router history={browserHistory} routes={routes} />
            </i18n.Provider>
          </StyleRoot>
        </Provider>,
        document.getElementById('react-view')
    );
// }).catch(error => {
//     console.error(error);
// });
