import React from 'react';
import { Switch, Route } from 'react-router-dom';

//provider
import { ProjectsProvider } from '../../context/projectsContext';

//components
import Statistics from '../../pages/Statistics/Statistics';
import Admin from '../../pages/Admin/Admin';
import Navigation from '../Navigation/Navigation';
import Users from '../../pages/Users/Users';
import DragAndDrop from '../../pages/Upload/DragAndDrop';
import Projects from '../../pages/Projects/Projects';
import ProjectsDownload from '../../pages/ProjectsDownload/ProjectsDownload';
import EditItem from '../../pages/EditItem/EditItem';
const AdminRoutes = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/upload" component={DragAndDrop} />
        <Route exact path="/projects" component={Projects} />
        <ProjectsProvider>
          <Route exact path="/download/:id" component={ProjectsDownload} />
          <Route exact path="/edit/:id" component={EditItem} />
          <Route exact path="/" component={Admin} />
        </ProjectsProvider>
      </Switch>
    </div>
  );
};

export default AdminRoutes;
