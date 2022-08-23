import React, { ReactElement } from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppRootStateType } from 'app/store';
import { loginTC } from 'features/Login/auth-reducer';

export const Login = (): ReactElement => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn,
  );
  const dispatch = useDispatch();

  type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
  };
  const minPasswordLength = 2;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required field';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (values.password.length <= minPasswordLength) {
        errors.password = `Password should includes more than ${minPasswordLength} characters`;
      }
      return errors;
    },
    onSubmit: () => {
      dispatch(
        loginTC(formik.values.email, formik.values.password, formik.values.rememberMe),
      );
      formik.resetForm();
    },
  });
  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={'https://social-network.samuraijs.com/'}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                {...formik.getFieldProps('email')}
                label="Email"
                type={'email'}
                margin="normal"
              />
              {formik.touched.email && (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              )}
              <TextField
                {...formik.getFieldProps('password')}
                type="password"
                label="Password"
                margin="normal"
              />
              {formik.touched.password && (
                <span style={{ color: 'red' }}>{formik.errors.password}</span>
              )}
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                    name={'rememberMe'}
                  />
                }
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
