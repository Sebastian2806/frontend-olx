import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainTemplate from '../components/templates/MainTemplate';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AddAnnoucement from './AddAnnoucement';
import authService from '../services/authService';

const PrivateRoute = ({ children, ...rest }) => {
  const token = authService.getCurrentUser();

  return <Route {...rest} render={() => (token ? children : <Redirect to="/" />)} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/addannoucement">
            <AddAnnoucement />
          </PrivateRoute>
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

export default App;
