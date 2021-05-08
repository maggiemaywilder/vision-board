// import Nav from './components/Navbar';
// import SignupPage from './components/SignupPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import NewBoard from './components/NewBoard';
import BoardView from './components/BoardView';

function App() {
  return (
    <div>
      <Router>
      <Switch>
        <Route exact path='/'><SignupPage /></Route>
        <Route path='/login'><LoginPage /></Route>
        <Route path='/boards'><NewBoard /></Route>
        <Route path='/users/:id'><BoardView /></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
