import React from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import ProjectsDownload from '../../pages/ProjectsDownload/ProjectsDownload';
import Navigation from '../Navigation/Navigation';
import Editor from '../../pages/Editor/Editor';
import UserAcc from '../../pages/UserAcc/UserAcc';

const EditorRoutes = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/acc" component={UserAcc} />
        <Route exact path="/download/:id" component={ProjectsDownload} />
        <Route exact path="/" component={Editor} />
      </Switch>
    </div>
  );
};

export default EditorRoutes;
