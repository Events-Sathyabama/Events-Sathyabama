'use client';
import {Button, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useRouter} from 'next/navigation';
import API from './API';

const axios = new API.Axios();

export default function LoginForm(): JSX.Element {
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			id: '',
			password: '',
			submit: null,
		},
		validationSchema: Yup.object({
			id: Yup.number()
				.typeError('ID must be a number')
				.integer('Please enter a valid ID')
				.min(0, 'Please enter a valid ID')
				.max(9999999999, 'ID is too long to be valid')
				.required('ID is required'),
			password: Yup.string().max(255).required('Password is required'),
		}),
		onSubmit: async (values, helpers) => {
			try {
				// FIXME login field has to be reg_no not email_id
				await axios.login(values.id, values.password);
				// await axios.login(values.username, values.password);
				if (typeof window !== 'undefined') {
					window.location.href = '/home/upcoming';
				}
			} catch (err) {
				// FIXME add the error message in the form err.response.data
				helpers.setStatus({success: false});
				helpers.setSubmitting(false);
			}
		},
	});

	return (
		<form
			noValidate
			onSubmit={formik.handleSubmit}
			className="flex flex-col gap-4 mt-3"
			autoComplete="off">
			<TextField
				error={!!(formik.touched.id && formik.errors.id)}
				fullWidth
				helperText={formik.touched.id && formik.errors.id}
				label="Registration Number/ Employee ID"
				name="id"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				type="text"
				value={formik.values.id}
			/>
			<TextField
				error={!!(formik.touched.password && formik.errors.password)}
				fullWidth
				helperText={formik.touched.password && formik.errors.password}
				label="Your Password"
				name="password"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				type="password"
				value={formik.values.password}
				autoComplete="on"
			/>
			{formik.errors.submit && (
				<Typography color="error" sx={{mt: 3}} variant="body2">
					{formik.errors.submit}
				</Typography>
			)}
			<Button
				size="large"
				type="submit"
				variant="contained"
				style={{
					backgroundColor: '#007efc',
					textTransform: 'none',
					fontSize: '1.5rem',
				}}
				color="primary"
				className="font-roboto shadow-md">
				Sign-in
			</Button>
		</form>
	);
}
