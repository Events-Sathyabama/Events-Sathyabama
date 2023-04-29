import {Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useRouter} from 'next/navigation';
import API from './API';

const axios = new API.Axios();

export default function PasswordPage(props: {
	showPopUp: Function;
	setBackdrop: Function;
}) {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			password: Yup.string().max(255).required('Password is required'),
			confirmPassword: Yup.string()
				.required('Confirm Password is required')
				.test('passwords-match', 'Passwords must match', function (value) {
					return this.parent.password === value;
				}),
		}),
		onSubmit: async (
			values: {password: string; confirmPassword: string},
			helpers: any
		) => {
			try {
				props.setBackdrop(true);
				// TODO: save the password here
				// success login that user bro
				if (typeof window !== 'undefined') {
					router.push('/home/upcoming');
				}
			} catch (err: any) {
				props.setBackdrop(false);
				props.showPopUp(true, err.response?.data?.detail || 'An error occurred');
			}
		},
	});

	return (
		<>
			<form
				noValidate
				onSubmit={(e) => {
					formik.handleSubmit(e);
					props.showPopUp(false);
				}}
				className="flex flex-col gap-4 mt-3"
				autoComplete="off">
				<TextField
					error={!!(formik.touched.password && formik.errors.password)}
					fullWidth
					helperText={formik.touched.password && formik.errors.password}
					label="Enter your new password"
					name="password"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					type={'text'}
					value={formik.values.password}
					autoComplete="off"
				/>
				<TextField
					error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
					fullWidth
					helperText={
						formik.touched.confirmPassword && formik.errors.confirmPassword
					}
					label="Re-enter your new password"
					name="confirmPassword"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					type={'text'}
					value={formik.values.confirmPassword}
					autoComplete="off"
				/>
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
					Confirm and Sign-in
				</Button>
			</form>
		</>
	);
}
