//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomRoute } from './Components/CustomRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import  LoginPage from './LoginPage/LoginPage'
import  SignUp from './LoginPage/SignUpPage'
import HomePage from './HomePage/HomePage'


function App() {
  
  return (
    <div className="App">
      <Router>
          <div>
              <CustomRoute exact path="/" component={HomePage}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={SignUp}/>
              {/* <Route path="/register" component={SignUpPage}/> */}
          </div>
      </Router>
</div>
  ); 
};

export default App;
