import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { Button, Box, TextField, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeaderTemplate from '../components/templates/HeaderTemplate';
import { authenticateAction } from '../actions';

const useStyles = makeStyles({
  box: {
    width: 300,
    margin: '0 auto',
    padding: 20,
  },
  h2: {
    fontSize: 30,
    textAlign: 'center',
  },
  input: {
    margin: '0 0 20px 0',
  },
  button: {
    margin: '30px 0 20px 0',
  },
});

const SignIn = ({ authenticate, history, user }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && user.isLoggedIn) {
      history.push('/');
    }
  }, [user, history]);

  return (
    <HeaderTemplate>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async ({ email, password }, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          setIsLoading(true);

          await authenticate(email, password, setErrors);

          setSubmitting(false);
          setIsLoading(false);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <Box className={classes.box} display="flex" flexDirection="column">
              <Typography className={classes.h2} variant="h2" gutterBottom>
                Logowanie
              </Typography>
              <Field
                error={!!(errors.email && touched.email)}
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                as={TextField}
                className={classes.input}
                value={values.email}
                helperText={!!(errors.email && touched.email) ? errors.email : null}
              />
              <Field
                error={!!(errors.password && touched.password)}
                type="password"
                name="password"
                label="Hasło"
                variant="outlined"
                as={TextField}
                className={classes.input}
                value={values.password}
                helperText={!!(errors.password && touched.password) ? errors.password : null}
              />
              <Button
                className={classes.button}
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isLoading ? <CircularProgress color="secondary" /> : 'Zaloguj się'}
              </Button>
              <Button to="/signup" component={RouterLink}>
                Nie masz konta?
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </HeaderTemplate>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: (email, password, setErrors) =>
    dispatch(authenticateAction(email, password, setErrors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
