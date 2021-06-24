import { Route, Link, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { UsersIndex } from './components/users';

const App = () => {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Link to="/users">Users</Link>
        </Route>
        <UsersIndex />
      </Switch>
    </div>
  );
};

export default App;
