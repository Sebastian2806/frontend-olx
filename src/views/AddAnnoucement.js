import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Box, TextField, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeaderTemplate from '../components/templates/HeaderTemplate';

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

const Home = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <HeaderTemplate>
      <Formik
        initialValues={{
          title: '',
          price: '',
          description: '',
          phone_number: '',
          localization: '',
          category_id: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <Box className={classes.box} display="flex" flexDirection="column">
              <Typography className={classes.h2} variant="h2" gutterBottom>
                Dodaj ogłoszenie
              </Typography>
              <Field
                error={!!(errors.title && touched.title)}
                name="title"
                label="Tytuł"
                variant="outlined"
                as={TextField}
                className={classes.input}
                value={values.title}
                helperText={!!(errors.title && touched.title) ? errors.title : null}
              />
              <Field
                error={!!(errors.price && touched.price)}
                name="price"
                label="Cena"
                variant="outlined"
                as={TextField}
                className={classes.input}
                value={values.price}
                helperText={!!(errors.price && touched.price) ? errors.price : null}
              />
              <Field
                error={!!(errors.description && touched.description)}
                name="description"
                label="Opis"
                variant="outlined"
                as={TextField}
                multiline
                rows="4"
                className={classes.input}
                value={values.description}
                helperText={
                  !!(errors.description && touched.description) ? errors.description : null
                }
              />
              <Field
                error={!!(errors.phone_number && touched.phone_number)}
                name="phone_number"
                label="Numer telefonu"
                variant="outlined"
                as={TextField}
                className={classes.input}
                value={values.phone_number}
                helperText={
                  !!(errors.phone_number && touched.phone_number) ? errors.phone_number : null
                }
              />
              <Field
                error={!!(errors.localization && touched.localization)}
                name="localization"
                label="Opis"
                variant="outlined"
                as={TextField}
                className={classes.input}
                value={values.localization}
                helperText={
                  !!(errors.localization && touched.localization) ? errors.localization : null
                }
              />
              <Button
                className={classes.button}
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                // disabled={isSubmitting}
              >
                {isLoading ? <CircularProgress color="secondary" /> : 'Zarejestruj się'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </HeaderTemplate>
  );
};

export default Home;
