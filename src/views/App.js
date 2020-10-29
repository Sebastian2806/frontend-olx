import React, { useEffect, useState } from 'react';
// import _ from 'lodash';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { setVH } from '../util/helpers';
import MainTemplate from '../components/templates/MainTemplate';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';

// const setHeight = setVH();

const App = () => {
  // const [user, setUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/user', {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     console.log(response.ok);
  //     const userData = await response.json();
  //     setUser(userData.user);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    // setHeight();
    // const debouced = _.debounce(setHeight, 500);
    // window.addEventListener('resize', debouced);
    // return () => {
    //   window.removeEventListener('resize', debouced);
    // };
    // getUser();
  }, []);

  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

export default App;
