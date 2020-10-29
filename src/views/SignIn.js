import React, { useState } from 'react';
import HeaderTemplate from '../components/templates/HeaderTemplate';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { Button, Box, TextField, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import authService from '../helpers/authService';

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

const SignIn = (props) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <HeaderTemplate>
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatedPassword: '',
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          setIsLoading(true);
          setSubmitting(true);
          authService
            .signin(values)
            .then((res) => {
              if (res.status === 401)
                return { success: false, msg: 'Niepoprawny login lub hasło!' };
              else if (res.ok === false) return { success: false, msg: 'Błąd serwera!' };
              else return res.json();
            })
            .then((user) => {
              if (!user.success) {
                setErrors({ email: user.msg });
              } else {
                props.history.push('/');
              }
              localStorage.setItem('token', user.token);
              setSubmitting(false);
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
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

export default SignIn;
