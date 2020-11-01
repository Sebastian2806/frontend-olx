import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Box,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeaderTemplate from '../components/templates/HeaderTemplate';

const useStyles = makeStyles((theme) => ({
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
  paper: {
    margin: '0 0 20px 0',
  },
}));

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const categoryIdRegExp = /^[0-9a-zA-Z]{24}$|^[0-9a-zA-Z]{12}$/;

const AddAnnoucementSchema = Yup.object().shape({
  title: Yup.string().max(40, 'Tytuł może mieć maksymalnie 40 znaków!').required('Pole wymagane!'),
  price: Yup.number()
    .typeError('Dozwolone są tylko cyfry!')
    .positive('Liczba musi być dodatnia!')
    .lessThan(1000000, 'Maksymalnie 1000000!')
    .required('Pole wymagane!'),
  description: Yup.string()
    .max(200, 'Opis może mieć maksymalnie 200 znaków!')
    .required('Pole wymagane!'),
  phone_number: Yup.string()
    .matches(phoneRegExp, 'Numer telefonu nie jest poprawny!')
    .required('Pole wymagane!'),
  localization: Yup.string()
    .max(40, 'Lokalizacja może mieć maksymalnie 40 znaków!')
    .required('Pole wymagane!'),
  category_id: Yup.string().matches(categoryIdRegExp, 'Wystąpił błąd!').required('Pole wymagane!'),
});

const Home = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    {
      _id: '5f89da8c85d20106ed1fd759',
      name: 'Dom i ogród',
    },
    {
      _id: '5f89daa185d20106ed1fd75a',
      name: 'Motoryzacja',
    },
    {
      _id: '5f89daa585d20106ed1fd75b',
      name: 'Praca',
    },
  ];

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
          photo: '',
        }}
        validationSchema={AddAnnoucementSchema}
        onSubmit={(values) => {
          let data = new FormData();
          data.append('photo', values.photo);

          fetch('http://localhost:8080/addAnnoucement', {
            method: 'PUT',
            body: data,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
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
                label="Lokalizacja"
                variant="outlined"
                as={TextField}
                className={classes.input}
                value={values.localization}
                helperText={
                  !!(errors.localization && touched.localization) ? errors.localization : null
                }
              />
              <Field
                error={!!(errors.category_id && touched.category_id)}
                name="category_id"
                select
                label="Kategoria"
                variant="outlined"
                as={TextField}
                className={classes.input}
                value={values.category_id}
                helperText={
                  !!(errors.category_id && touched.category_id) ? errors.category_id : null
                }
              >
                {categories.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Field>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setFieldValue('photo', event.currentTarget.files[0]);
                }}
              />
              <label htmlFor="raised-button-file" className={classes.input}>
                <Button fullWidth variant="outlined" component="span">
                  Dodaj plik
                </Button>
              </label>
              {values.photo ? (
                <Paper className={classes.paper}>
                  <Typography>{values.photo.name}</Typography>
                </Paper>
              ) : (
                ''
              )}
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
