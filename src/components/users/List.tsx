import React, { useCallback, useState } from 'react';
import { User } from '../../types/User';
import { Item } from './Item';
//import { UsersResolvers } from '../../resolvers/users';
import { List } from '../styled';
import { UsersResolvers } from '../../resolvers/UsersResolvers';

interface IProps<T> {
  setFormState: React.Dispatch<React.SetStateAction<T>>;
}

export const UsersList: React.FC<IProps<User>> = ({ setFormState }) => {
  const { useFetch } = UsersResolvers();
  const { data, error } = useFetch<User[], any>();

  const loadingElement = <div>Loading</div>;
  const errorElement = (message: string) => <div>Error: {message}</div>;

  return (
    <>
      <h1>List</h1>
      <div>
        {!data && loadingElement}
        {error && errorElement(error.message)}
        <List>
          {data?.map((user: User, key: number) => (
            <Item key={key} user={user} setFormState={setFormState} />
          ))}
        </List>
      </div>
    </>
  );
};
