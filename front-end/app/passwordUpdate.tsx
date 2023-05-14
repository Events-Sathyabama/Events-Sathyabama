import {Button, TextField, InputAdornment, IconButton} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useRouter} from 'next/navigation';
import API from './API';
import {useState} from 'react';

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

	const [showPassword1, setShowPassword1] = useState(false);
	const handlePasswordVisibility1 = () => {
		setShowPassword1(!showPassword1);
	};

	const [showPassword2, setShowPassword2] = useState(false);
	const handlePasswordVisibility2 = () => {
		setShowPassword2(!showPassword2);
	};

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
					type={showPassword1 ? 'text' : 'password'}
					value={formik.values.password}
					autoComplete="off"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handlePasswordVisibility1}>
									{showPassword1 ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
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
					type={showPassword2 ? 'text' : 'password'}
					value={formik.values.confirmPassword}
					autoComplete="off"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handlePasswordVisibility2}>
									{showPassword2 ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
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
