import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import configureStore from './store/configureStore';
import App from './containers/App';

const history = createBrowserHistory();
const store = configureStore(history);
render(
<Provider store={store}>
    <App />
</Provider>
, document.querySelector('#root'));