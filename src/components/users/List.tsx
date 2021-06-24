import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { UserType } from '../../types/UserType';
import { ListItem } from './ListItem';
import { List, Button } from '../styled';

interface IProps {
  deleteAction: Function;
  data: any;
  error: any;
}

export const UsersList: React.FC<IProps> = (props) => {
  const { url } = useRouteMatch();
  const history = useHistory();

  const loadingElement = <div>Loading</div>;
  const errorElement = (message: string) => <div>Error: {message}</div>;

  const newItemAction = () => {
    //props.setFormState({});
    history.push('/users/new');
  };

  return (
    <>
      <h1>List</h1>
      <div>
        {!props.data && !props.error && loadingElement}
        {props.error && errorElement(props.error.message)}
        <List>
          {props.data?.map((user: UserType, key: number) => (
            <ListItem key={key} user={user} deleteAction={props.deleteAction} />
          ))}
        </List>
      </div>
      <Button onClick={newItemAction}>New User</Button>
    </>
  );
};
