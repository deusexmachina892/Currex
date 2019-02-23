// import React from 'react'
// import { renderToString } from 'react-dom/server';
// import { createBrowserHistory } from 'history';
// import { Provider } from 'react-redux';
// import configureStore from './store/configureStore';
// import App from './containers/App';


// module.exports = function render(initialState) {
//   const history = createBrowserHistory();
//   // Configure the store with the initial state provided
//   const store = configureStore(history, initialState)

//   // render the App store static markup ins content variable
//   let content = renderToString(
//     <Provider store={store} >
//        <App />
//     </Provider>
//   );

//   // Get a copy of store data to create the same store on client side 
//   const preloadedState = store.getState()

//   return {content, preloadedState};
// }