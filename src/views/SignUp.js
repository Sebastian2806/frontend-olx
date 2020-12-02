import React, { useState, useEffect } from 'react';
import HeaderTemplate from '../components/templates/HeaderTemplate';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Button, Box, TextField, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { signupAction } from '../actions/index';

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

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Niepoprawny adres email!').required('Pole wymagane!'),
  password: Yup.string()
    .min(5, 'Hasło zbyt krótkie!')
    .max(25, 'Hasło zbyt długie!')
    .required('Pole wymagane!'),
  repeatedPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Hasła muszą pasować!')
    .required('Pole wymagane!'),
});

const SignUp = ({ signup, signupStatus }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (signupStatus && signupStatus.status && signupStatus.status === 201) {
      history.push('/signin');
    }
  }, [signupStatus, history]);

  return (
    <HeaderTemplate>
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatedPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async ({ email, password, repeatedPassword }, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          setIsLoading(true);

          await signup(email, password, repeatedPassword, setErrors);

          setSubmitting(false);
          setIsLoading(false);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <Box className={classes.box} display="flex" flexDirection="column">
              <Typography className={classes.h2} variant="h2" gutterBottom>
                Rejestracja
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
                helperText={!!errors.password ? errors.password : null}
              />
              <Field
                error={!!(errors.repeatedPassword && touched.repeatedPassword)}
                type="password"
                name="repeatedPassword"
                label="Powtórz hasło"
                variant="outlined"
                as={TextField}
                className={classes.input}
                value={values.repeatedPassword}
                helperText={
                  !!(errors.repeatedPassword && touched.repeatedPassword)
                    ? errors.repeatedPassword
                    : null
                }
              />
              <Button
                className={classes.button}
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isLoading ? <CircularProgress color="secondary" /> : 'Zarejestruj się'}
              </Button>
              <Button to="/signin" component={RouterLink}>
                Masz już konto?
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </HeaderTemplate>
  );
};

const mapStateToProps = (state) => {
  const { signupStatus } = state;
  return { signupStatus };
};

const mapDispatchToProps = (dispatch) => ({
  signup: (email, password, repeatedPassword, setErrors) =>
    dispatch(signupAction(email, password, repeatedPassword, setErrors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
