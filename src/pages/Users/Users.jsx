import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/api';

import UsersInfo from '../../components/UsersInfo/UsersInfo';

import { Button } from '@material-ui/core';

const Users = () => {
  const [data, setData] = useState('');

  const getUsers = useCallback(async () => {
    const response = await api.get('/users?size=10&page=1');
    setData(response.data.rows);

    console.log(response.data, 'response');
  }, []);

  const createUserHandler = () => {
    console.log('usao');
  };
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const removeUserHandler = (id) => {
    console.log(id);
  };
  const editUserHandler = (el) => {
    console.log(el);
  };

  return (
    <div>
      {data !== '' ? (
        <>
          {data.map((el) => (
            <div key={el.id}>
              <UsersInfo {...el} />
              <Button onClick={() => removeUserHandler(el.id)}>Remove</Button>
              <Button onClick={() => editUserHandler(el)}>Edit</Button>
            </div>
          ))}
          <button onClick={createUserHandler}>Create New User</button>
        </>
      ) : null}
    </div>
  );
};

export default Users;
