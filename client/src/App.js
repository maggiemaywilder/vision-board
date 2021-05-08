// import Nav from './components/Navbar';
// import SignupPage from './components/SignupPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div>
      <Router>
      <Switch>
        <Route exact path='/'><SignupPage /></Route>
        <Route path='/login'><LoginPage /></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
