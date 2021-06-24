import { UserType } from '../types/UserType';
import useSWR from 'swr';
import axios from 'axios';
import { useCallback } from 'react';
import { isTemplateExpression } from 'typescript';

const USERS_API = 'http://localhost:4000/users';

const api = axios.create({
  baseURL: USERS_API,
});

export const usersResolvers = () => {
  const getAll = <Data = any, Error = any>() => {
    const { data, error, mutate } = useSWR<Data, Error>(
      USERS_API,
      async (url) => {
        const response = await api.get(url);
        return response.data;
      }
    );
    return { data, error, mutate };
  };

  const { data, error, mutate } = getAll<UserType[]>();

  const getItem = (id: string) => {
    if (data) {
      for (let user of data) {
        if (user.id === id) {
          return user;
        }
      }
    }
  };

  const editAction = useCallback(
    (user: UserType) => {
      api.put(`/${user.id}`, user);

      const updatedUsers = data?.map((item) => {
        if (user.id === item.id) {
          return { ...item, ...user };
        }
        return item;
      });
      mutate(updatedUsers, false);
    },
    [data, mutate]
  );

  const createAction = useCallback(
    async (user: UserType) => {
      await api.post('/', user);
      const updatedUsers = data || [];
      updatedUsers.push(user);
      mutate(updatedUsers, true);
    },
    [data, mutate]
  );

  const deleteAction = useCallback(
    (user: UserType) => {
      api.delete(`/${user.id}`);

      const updatedUsers = data?.filter((item) => {
        return item.id !== user.id;
      });
      mutate(updatedUsers, false);
    },
    [data, mutate]
  );

  return {
    editAction,
    createAction,
    deleteAction,
    getItem,
    data,
    error,
  };
};
