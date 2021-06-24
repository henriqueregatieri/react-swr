import { Link } from 'react-router-dom';
import { Header as HeaderEl, Counter } from './styled';

export const Header = () => {
  return (
    <HeaderEl>
      {<Counter>Count: ?</Counter>}
      <h1>
        <Link to="/users">My CRUD</Link>
      </h1>
    </HeaderEl>
  );
};
