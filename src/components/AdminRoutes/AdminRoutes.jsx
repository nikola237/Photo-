import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Statistics from '../../pages/Statistics/Statistics';
import Admin from '../../pages/Admin/Admin';
import Navigation from '../Navigation/Navigation';
import Users from '../../pages/Users/Users';
import DragAndDrop from '../../pages/Upload/DragAndDrop';
import Projects from '../../pages/Projects/Projects';

const AdminRoutes = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/upload" component={DragAndDrop} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/" component={Admin} />
      </Switch>
    </div>
  );
};

export default AdminRoutes;
