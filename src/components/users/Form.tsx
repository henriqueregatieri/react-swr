import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { usersResolvers } from '../../resolvers/usersResolvers';
import { UserType } from '../../types/UserType';
import { Button } from '../styled';

interface IProps<T> {
  getItem: Function;
}

interface UrlParams {
  id?: string;
}

export const UsersForm: React.FC<IProps<UserType>> = (props) => {
  const { getItem, createAction, editAction, data, error } = usersResolvers();
  const { id } = useParams<UrlParams>();

  const initialUser: UserType = {
    name: '',
    email: '',
    job_title: '',
  };

  const submitAction = () => {
    if (id) {
      editAction(formState);
    } else {
      createAction(formState);
    }
    history.push('/users');
  };

  const { formState, setFormState, handleChange, handleSubmit } = useForm(
    initialUser,
    submitAction
  );

  useEffect(() => {
    if (id) {
      const user = getItem(id);
      if (user !== undefined) {
        setFormState(user);
      }
    } else {
      setFormState(initialUser);
    }
  }, [id]);

  const history = useHistory();

  const cancelAction = () => {
    history.push('/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit' : 'New'}</h1>
      <p>
        <label>Name:</label>
        <input
          name="name"
          key="name"
          onChange={handleChange}
          value={formState.name}
        />
      </p>
      <p>
        <label>E-mail:</label>
        <input
          name="email"
          key="email"
          onChange={handleChange}
          value={formState.email}
        />
      </p>
      <p>
        <label>Job title:</label>
        <input
          name="job_title"
          key="job_title"
          onChange={handleChange}
          value={formState.job_title}
        />
      </p>
      <p>
        <Button type="submit">Send</Button>
        {id && <Button onClick={cancelAction}>Cancel</Button>}
      </p>
    </form>
  );
};
