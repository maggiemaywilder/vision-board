import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NewBoard from './pages/NewBoard';
import BoardView from './pages/BoardView';

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
