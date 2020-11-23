import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Statistics from '../../pages/Statistics/Statistics';
import Admin from '../../pages/Admin/Admin';
import Navigation from '../Navigation/Navigation';
import Users from '../../pages/Users/Users';
import EditItem from '../../pages/EditItem/EditItem';
import Upload from '../../pages/Upload/Upload';

const AdminRoutes = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/upload" component={Upload} />
        <Route
          exact
          path="/edit/:id"
          component={(props) => <EditItem {...props} />}
        />
        <Route exact path="/" component={Admin} />
      </Switch>
    </div>
  );
};

export default AdminRoutes;

/* {type === 0
          ? items.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id ? item.id : 1}>
                <Image key={item.id ? item.id : 1} {...item} />
              </Grid>
            ))
          : type === 1
          ? items.map((item) => <Video key={item.id ? item.id : 1} {...item} />)
          : items.map((item) => (
              <Audio key={item.id ? item.id : 1} {...item} />
            ))} */
