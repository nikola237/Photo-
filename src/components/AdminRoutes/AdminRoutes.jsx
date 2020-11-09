import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Statistics from '../../pages/Statistics/Statistics';
import Admin from '../../pages/Admin/Admin';
import Navigation from '../Navigation/Navigation';
import Users from '../../pages/Users/Users';
import EditItem from '../../pages/EditItem/EditItem';

const AdminRoutes = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/statistics" component={Statistics} />
        <Route
          exact
          path="/edit/:id"
          render={(props) => <EditItem {...props} />}
        />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </div>
  );
};

export default AdminRoutes;
