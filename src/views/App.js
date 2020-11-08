import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainTemplate from '../components/templates/MainTemplate';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AnnoucementDetails from './AnnoucementDetails';
import AddAnnoucement from './AddAnnoucement';
import AccountDetails from './AccountDetails';
import authService from '../services/authService';
import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1400,
    },
  },
});

const PrivateRoute = ({ children, ...rest }) => {
  const token = authService.getCurrentUser();

  return <Route {...rest} render={() => (token ? children : <Redirect to="/" />)} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainTemplate>
          <CssBaseline />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/annoucementDetails/:annId" component={AnnoucementDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/addannoucement">
              <AddAnnoucement />
            </PrivateRoute>
            <PrivateRoute path="/userdetails/:userId">
              <AccountDetails />
            </PrivateRoute>
          </Switch>
        </MainTemplate>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
