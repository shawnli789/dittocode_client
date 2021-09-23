import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './scss/theme.scss';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById('root')
);

