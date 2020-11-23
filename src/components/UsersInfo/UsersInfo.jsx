import React from 'react';

const UsersInfo = ({
  id,
  firstname,
  lastname,
  username,
  email,
  role,
  isactive,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>{String(isactive)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersInfo;
