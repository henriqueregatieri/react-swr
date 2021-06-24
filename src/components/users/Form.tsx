import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserType } from '../../types/UserType';
import { Button } from '../styled';

interface IProps<T> {
  formState: UserType;
  setFormState: React.Dispatch<React.SetStateAction<T>>;
  handleChange: React.ChangeEventHandler;
  handleSubmit: React.FormEventHandler;
  getItem: Function;
}

interface UrlParams {
  id?: string;
}

export const UsersForm: React.FC<IProps<UserType>> = (props) => {
  const { id } = useParams<UrlParams>();

  useEffect(() => {
    if (!id && props.formState.id) {
      props.setFormState({});
    }

    if (id && !props.formState.id) {
      const user = props.getItem(id);

      if (user !== undefined) {
        props.setFormState(user);
      }
    }
  });

  const history = useHistory();

  const cancelAction = () => {
    history.push('/users');
  };

  return (
    <form onSubmit={props.handleSubmit}>
      <h1>{id ? 'Edit' : 'New'}</h1>
      <p>
        Name:{' '}
        <input
          name="name"
          key="name"
          onChange={props.handleChange}
          value={props.formState.name}
        />
      </p>
      <p>
        E-mail:{' '}
        <input
          name="email"
          key="email"
          onChange={props.handleChange}
          value={props.formState.email}
        />
      </p>
      <p>
        Job title:{' '}
        <input
          name="job_title"
          key="job_title"
          onChange={props.handleChange}
          value={props.formState.job_title}
        />
      </p>
      <p>
        <Button type="submit">Send</Button>
        {id && <Button onClick={cancelAction}>Cancel</Button>}
      </p>
    </form>
  );
};
