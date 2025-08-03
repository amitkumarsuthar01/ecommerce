import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Updated import
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import Contextprovider from './components/context/Contextprovider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Contextprovider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Contextprovider>
  </React.StrictMode>
);
