import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import { CountryStore } from './Stores/CountryStore';
import { CountryService } from './Services/CountryService'

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
