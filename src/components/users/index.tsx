import { Route, useHistory } from 'react-router-dom';
import { UsersForm } from './Form';
import { UsersList } from './List';
import { useForm } from '../../hooks/useForm';
import { usersResolvers } from '../../resolvers/usersResolvers';
import { UserType } from '../../types/UserType';

export const UsersIndex = () => {
  const { getItem, createAction, editAction, deleteAction, data, error } =
    usersResolvers();

  const history = useHistory();

  const submitAction = () => {
    !formState.id
      ? createAction(formState)
      : editAction({
          id: formState.id,
          name: formState.name,
          email: formState.email,
          job_title: formState.job_title,
        });

    history.push('/users');
  };

  const { formState, setFormState, handleChange, handleSubmit } =
    useForm<UserType>({}, submitAction);

  const UsersFormFull = () => {
    return (
      <UsersForm
        formState={formState}
        setFormState={setFormState}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        getItem={getItem}
      />
    );
  };

  return (
    <>
      <Route path="/users" exact>
        <UsersList
          setFormState={setFormState}
          data={data}
          error={error}
          deleteAction={deleteAction}
        />
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
