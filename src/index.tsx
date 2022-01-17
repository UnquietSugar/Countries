import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import CountryStore from './Stores/CountryStore';
import CountryService from './Services/CountryService'

const countryServce = new CountryService();
const countryStore = new CountryStore(countryServce);

ReactDOM.render(
  <React.StrictMode>
    <Provider countryStore={countryStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
