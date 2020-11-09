import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/users" activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="active">
            Statistics
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
