import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
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
        <Route path='/users'><BoardView /></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
