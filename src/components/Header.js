import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import authService from '../services/authService';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.grey['800'],
  },
  h1: {
    padding: '10px 20px',
    fontSize: 30,
    textDecoration: 'none',
    color: '#fff',
    flexGrow: 1,
  },
  h2: {
    fontSize: 30,
    textAlign: 'center',
  },
  icon: {
    color: '#fff',
  },
  input: {
    margin: '0 0 20px 0',
  },
  button: {
    margin: '30px 0 20px 0',
  },
}));

const Header = () => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = authService.getCurrentUser();
    const user_id = authService.getCurrentUserId();
    if (token) {
      setCurrentUser(token);
    }
    if (user_id) {
      setCurrentUserId(user_id);
    }
  }, []);

  const logOut = () => {
    authService.logout();
    setCurrentUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Link className={classes.h1} to="/" component={RouterLink}>
          XLO
        </Link>
        <IconButton
          component={RouterLink}
          className={classes.icon}
          to={!currentUser ? '/signin' : `/userdetails/${currentUserId}`}
        >
          <AccountCircleIcon />
        </IconButton>
        {currentUser ? (
          <>
            <IconButton component={RouterLink} to="/addannoucement" className={classes.icon}>
              <AddIcon />
            </IconButton>
            <IconButton component={RouterLink} to="/" className={classes.icon} onClick={logOut}>
              <ExitToAppIcon />
            </IconButton>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
