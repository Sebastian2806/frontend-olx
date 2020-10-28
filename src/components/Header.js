import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import Button from './atoms/Button';
import { AppBar, TextField, Typography, Toolbar, IconButton, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
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
});

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #000;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link className={classes.h1} to="/" component={RouterLink}>
          XLO
        </Link>
        <IconButton component={RouterLink} className={classes.icon} to="/signup">
          <AccountCircleIcon />
        </IconButton>
        {/* <StyledWrapper> */}
        {/* <Link to="/">
          <h1>XLO</h1>
        </Link> */}
        {/* <div>
        <Link to="/signin">
          <Button>Mój XLO</Button>
        </Link>
        <Button>Dodaj ogłoszenie</Button>
      </div> */}
        {/* </StyledWrapper> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
