import { useHistory, useRouteMatch } from 'react-router-dom';
import swal from 'sweetalert';
import { UserType } from '../../types/UserType';
import { Button } from '../styled';

interface IProps<T> {
  user: T;
  deleteAction: Function;
}
export const ListItem: React.FC<IProps<UserType>> = (props) => {
  const history = useHistory();
  const user = props.user;

  const editItem = (user: UserType): void => {
    //props.setFormState(user);
    history.push(`/users/${user.id}/edit`);
  };

  const deleteItem = (user: UserType) => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this record?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    }).then((response) => {
      if (response) {
        props.deleteAction(user);
        swal('Deleted!', 'You record has been deleted!', 'success');
      }
    });
  };

  return (
    <li key={user.id}>
      <div>ID: {user.id}</div>
      <div>Name: {user.name}</div>
      <div>E-mail: {user.email}</div>
      <div>Job title: {user.job_title}</div>
      <Button onClick={() => editItem(user)}>Edit</Button>
      <Button onClick={() => deleteItem(user)}>Delete</Button>
    </li>
  );
};
