import { Route, useHistory } from 'react-router-dom';
import { UsersForm } from './Form';
import { UsersList } from './List';
import { usersResolvers } from '../../resolvers/usersResolvers';

export const UsersIndex = () => {
  const { getItem, deleteAction, data, error } = usersResolvers();

  const UsersFormFull = () => {
    return <UsersForm getItem={getItem} />;
  };

  return (
    <>
      <Route path="/users" exact>
        <UsersList data={data} error={error} deleteAction={deleteAction} />
      </Route>
      <Route path="/users/new" exact>
        <UsersFormFull />
      </Route>
      <Route path="/users/:id/edit" exact>
        <UsersFormFull />
      </Route>
    </>
  );
};
