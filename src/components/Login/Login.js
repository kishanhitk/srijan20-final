import React, { useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Alert, Spin } from 'antd';
import firebase from '../../firebase/config';
import './Login.css';

const isValid = (email, passwd) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const validEmail = emailRegex.test(email);
  const validPasswd = passwd.length >= 6;
  return validEmail && validPasswd;
}

const Login = props => {
  const { history } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  const handleSignIn = useCallback(async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setIsLoading(false);
      history.push('/app');
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [history]);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const { email, password } = e.target.elements;
    if (isValid(email.value, password.value)) {
      handleSignIn(email.value, password.value);
      setFormError(false);
    } else {
      setFormError(true);
      setIsLoading(false);
    }
  }, [handleSignIn]);

  return (
    <section className="login">
      <Form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        {formError ? <Alert message="Invalid email or password!" type="error" /> : null}
        {error ? <Alert message={error.message} type="error" /> : null}
        <br />
        <Form.Item>
          <Input name="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Input name="password" type={showPassword ? "text" : "password"} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
          <Checkbox onChange={e => setShowPassword(!showPassword)}>Show Password</Checkbox>
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>&nbsp;&nbsp;&nbsp;
        {isLoading ? <Spin /> : null}
        <br /><br />
        <Link to="/register">Create an account</Link>
        <hr />
        <div className="altSignIn" onClick={handleGoogleSignIn}>
          <Icon type="google" /> Sign In with Google
        </div>
        {/* <div className="altSignIn">
          <Icon type="facebook" /> Sign In with Facebook
        </div> */}
      </Form>
    </section>
  );
} 

export default withRouter(Login);