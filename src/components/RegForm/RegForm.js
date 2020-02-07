import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { OnboardingButton, InputStyle } from '../GeneralStyling';

const Register = ({ errors, touched, values, status, ...props }) => {
	const [ user, setUser ] = useState([]);

	useEffect(
		() => {
			status && setUser((person) => [ ...person, status ]);
		},
		[ status ]
	);
	return (
		<div className="onboarding-1">
			<div style={{ color: 'white' }}>
				<h3>Let's get started!</h3>
				<h4 style={{ fontWeight: 'normal' }}>First, let's get your information</h4>
			</div>
			<Form>
				<Field style={InputStyle} type="text" name="name" placeholder="Name" value={values.name} />
				{touched.name && errors.name && <p>{errors.name}</p>}

				<Field style={InputStyle} type="email" name="email" placeholder="Email" value={values.email} />
				{touched.email && errors.email && <p>{errors.email}</p>}

				<Field
					style={InputStyle}
					type="password"
					name="password"
					placeholder="Password"
					value={values.password}
				/>
				{touched.password && errors.password && <p>{errors.password}</p>}

				<Field
					style={InputStyle}
					type="password"
					name="confirm"
					placeholder="Confirm Password"
					value={values.confirm}
				/>
				{touched.confirm && errors.confirm && <p>{errors.confirm}</p>}

				<OnboardingButton
					onClick={() => {
						props.history.push('/childinfo');
					}}
					type="submit"
				>
					Next
				</OnboardingButton>
			</Form>

			{user.map((el) => (
				<ul>
					<li>name: {el.name}</li>
					<li>email: {el.email}</li>
					<li>password: {el.password}</li>
					<li>confirm: {el.confirm}</li>
				</ul>
			))}
		</div>
	);
};

export default withFormik({
	mapPropsToValues({ users }) {
		//passing props to each field
		return {
			name: users || '',
			email: '',
			password: '',
			confirm: ''
		};
	},

	//validation required - making sure all users fill out each field.
	validationSchema: Yup.object().shape({
		name: Yup.string().required('Please fill in your name!'),
		email: Yup.string().required('Please provide your email!'),
		password: Yup.string().required('Password Required!'),
		confirm: Yup.string().required('Confirm Password!')
	}),

	handleSumbit(values, { setStatus, resetForm }) {
		console.log('submitting form:', values);

		Axios.post('https://gigapetdb.herokuapp.com/auth/register', values)
			.then((res) => {
				
				console.log(res, 'successful');
				setStatus(res.data);
				resetForm();
			})
			.catch((err) => {
				console.log('Error', err);
			});
	}
})(Register);
