'use client';
import {
	Button,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import {useFormik} from 'formik';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import * as Yup from 'yup';
import API from './API';

const axios = new API.Axios();

export default function LoginForm(props: {
	showPopUp: Function;
	setBackdrop: Function;
	variant: String;
	userMail: Function;
	changetoOtp: Function;
}): JSX.Element {
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
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
			password:
				props.variant !== 'forgot'
					? Yup.string().max(255).required('Password is required')
					: Yup.string().max(255),
		}),
		onSubmit: async (values, helpers) => {
			try {
				props.setBackdrop(true);
				if (props.variant === 'forgot') {
					const url = API.get_url('user:send_otp');
					const response = await axios.send_otp(values.id);
					console.log(response.status);
					if (response.status === 200) {
						localStorage.setItem('user_id', values.id);
					}
					props.setBackdrop(false);
					// if the register number exists share their mail to me and change to otp page (Success)
					props.userMail(response.data.email);
					props.changetoOtp();
				} else {
					const response = await axios.login(values.id, values.password);
					if (typeof window !== 'undefined') {
						router.push('/home/upcoming');
					}
				}
			} catch (err: any) {
				console.error(err);
				props.setBackdrop(false);
				props.showPopUp(true, err.response.data.detail);
				helpers.setStatus({success: false});
				helpers.setSubmitting(false);
			}
		},
	});

	return (
		<>
			<form
				noValidate
				onSubmit={async (e) => {
					formik.handleSubmit(e);
					props.showPopUp(false);
				}}
				className="flex flex-col gap-4 mt-3"
				autoComplete="off">
				<TextField
					error={!!(formik.touched.id && formik.errors.id)}
					fullWidth
					helperText={formik.touched.id && formik.errors.id}
					label="Registration Number / Employee ID"
					name="id"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					type="text"
					value={formik.values.id}
				/>
				{props.variant === 'forgot' ? (
					<p className="text-gray-500 -mt-3 text-xs mx-3">
						You'll receive an <span className="font-medium">OTP</span> on your
						registered email address if the
						<span className="font-medium"> Register Number / Employee ID</span> is
						valid.
					</p>
				) : (
					<></>
				)}
				{props.variant !== 'forgot' ? (
					<TextField
						error={!!(formik.touched.password && formik.errors.password)}
						fullWidth
						helperText={formik.touched.password && formik.errors.password}
						label="Password"
						name="password"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						type={showPassword ? 'text' : 'password'}
						value={formik.values.password}
						autoComplete="on"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={handlePasswordVisibility}>
										{showPassword ? (
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
				) : (
					<></>
				)}
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
					{props.variant !== 'forgot' ? 'Sign-in' : 'Get OTP'}
				</Button>
			</form>
		</>
	);
}
