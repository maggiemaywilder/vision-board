import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NewBoard from './pages/NewBoard';
import BoardView from './pages/BoardView';
import HomePage from './pages/HomePage';
import { UserProvider } from './utils/GlobalState';

function App() {
  return (
    <div>
      <UserProvider>
      <Router>
        <Switch>
          <Route exact path='/'><SignupPage /></Route>
          <Route path='/login'><LoginPage /></Route>
          <Route path='/users/:userName'><HomePage /></Route>
          <Route path='/boards/new/:bid'><NewBoard /></Route>
          <Route path='/boards/:bid'><BoardView /></Route>
        </Switch>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
