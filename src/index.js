import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './Css/components/google.css';
import './Css/components/loading.css';
import './Css/components/button.css';
import './Css/components/alert.css';
import './Pages/Auth/Auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import 'react-loading-skeleton/dist/skeleton.css';
import CartChanger from './Context/CartChanger';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <CartChanger>
          <Router>
            <App />
          </Router>
        </CartChanger>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);