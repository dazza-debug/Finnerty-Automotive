import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './App.css';

import reportWebVitals from './reportWebVitals';
const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<div className="lds-container"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}>
      <App />
    </React.Suspense>
    {/*<Home />*/}
    {/*<App />*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
