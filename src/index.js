import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';


const store = createStore(rootReducer, applyMiddleware(logger))

const MyApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    {/* <Router>
      <Route path="/" component={App}/>
    </Router> */}
  </Provider>
)

ReactDOM.render(<MyApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
