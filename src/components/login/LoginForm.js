import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {
  InputStyle,
  OnboardingButton,
  OnboardingButtonLine
} from "../GeneralStyling";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import {connect} from 'react-redux';
import {addUser} from '../../actions/'

const Login = ({addUser, ...props}) => {
 
  const [ isLoading, setLoading ] = useState(false)
  return (
  <div>
    <Formik
      className="container"
      initialValues={{ username: "", password: "" }}
      validate={values => {
        const errors = {};
        if (!values.username || !values.password) {
          errors.username = "All fields are required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
        ) {
          errors.username = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values) => {
        setLoading(true)
        axios.post("https://gigapetdb.herokuapp.com/auth/login", values)
        .then(res => {
          console.log(res)
          addUser(res.data.id)
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.id);
          window.location.reload()
        })
        .catch(err=>{
          setLoading(false)
          console.log(err)
        })
      }}
    >
      {({ isSubmitting }) => (

      
        <Form>
          <Field
            placeholder="Email"
            style={InputStyle}
            type="text"
            name="username"
          />
          <Field
            placeholder="Password"
            style={InputStyle}
            type="password"
            name="password"
          />
          <ErrorMessage
            style={{ fontSize: "14px" }}
            name="username"
            component="div"
          />
          <ErrorMessage
            style={{ fontSize: "14px" }}
            name="password"
            component="div"
          />
          <OnboardingButton type="submit">
            {isLoading ? 'Loading...' : 'Log In'}
          </OnboardingButton>
          <Link to="/onboarding-1">
          <OnboardingButtonLine type="button">
            Sign Up
          </OnboardingButtonLine>
          
          </Link>

        </Form>
      )}
    </Formik>
  </div>
)};

export default connect(state=>{
  return {

  }
}, {
  addUser
})(Login);
