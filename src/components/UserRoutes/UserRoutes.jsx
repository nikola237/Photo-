import React from 'react';

import { Switch, Route } from 'react-router-dom';

//components
import User from '../../pages/User/User';
import UserAcc from '../../pages/UserAcc/UserAcc';
import Navigation from '../Navigation/Navigation';

const UserRoutes = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/acc" component={UserAcc} />
        <Route exact path="/" component={User} />
      </Switch>
    </div>
  );
};

export default UserRoutes;
