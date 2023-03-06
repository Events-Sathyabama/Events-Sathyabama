'use client'
import { Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import AxiosInstance from "./AxiosInstance";

const axios = new AxiosInstance();

export default function LoginForm(): JSX.Element {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // FIXME login field has to be reg_no not email_id
        axios.login('admin', 'admin');
        // axios.login(values.username, values.password);
        window.location.href = '/home/upcoming';
      } catch (err) {
        // FIXME add the error message in the form err.response.data
        helpers.setStatus({ success: false })
        helpers.setSubmitting(false)
      }
    },
  })

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      className='flex flex-col gap-4 mt-3'
      autoComplete='off'
    >
      <TextField
        error={!!(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label='Your Email Address'
        name='email'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type='email'
        value={formik.values.email}
      />
      <TextField
        error={!!(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label='Your Password'
        name='password'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type='password'
        value={formik.values.password}
        autoComplete='on'
      />
      {formik.errors.submit && (
        <Typography color='error' sx={{ mt: 3 }} variant='body2'>
          {formik.errors.submit}
        </Typography>
      )}
      <Button
        size='large'
        type='submit'
        variant='contained'
        style={{
          backgroundColor: '#007efc',
          textTransform: 'none',
          fontSize: '1.5rem',
        }}
        color='primary'
        className='font-roboto shadow-md'
      >
        Sign-in
      </Button>
    </form>
  )
}
