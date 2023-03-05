"use client"
import { Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function LoginForm(): JSX.Element {
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
        // TODO values.email, values.password
      } catch (err) {
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
        style={{ backgroundColor: '#007efc', textTransform: 'none' }}
        color='primary'
        className='font-roboto text-2xl shadow-md'
      >
        Sign-in
      </Button>
    </form>
  )
}
