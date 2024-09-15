import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { BASE_URL } from '../../config'; // Import the base URL
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: email,
        password: password,
      });

      if (response.data.access_token) {
        // Save the token to local storage
        localStorage.setItem('authToken', response.data.access_token);
        
        // Display success message using Toastr
        toastr.success('Login successful!', 'Success');
        navigate('/dashboard'); // Redirect to dashboard on successful login
        // Redirect user or update the UI as needed
      } else {
        setErrorMessage('Invalid login credentials');
        toastr.error('Invalid login credentials', 'Error');
      }
    } catch (error) {
      let errorMsg = 'Login failed. Please try again.';
      
      if (error.response && error.response.data.message) {
        errorMsg = error.response.data.message;
      }
      
      setErrorMessage(errorMsg);
      toastr.error(errorMsg, 'Error');
    }
  };

  return (
    <div className="login-page bg-light">
      <div className="container login-container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="mb-3">Login Now</h3>
            <div className="bg-white shadow rounded">
              <div className="row">
                <div className="col-md-7 pe-0">
                  <div className="form-left h-100 py-5 px-5">
                    <form onSubmit={handleLogin} className="row g-4">
                      <div className="col-12">
                        <label>Email<span className="text-danger">*</span></label>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="fas fa-user"></i>
                          </div>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <label>Password<span className="text-danger">*</span></label>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="fas fa-lock"></i>
                          </div>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      {errorMessage && (
                        <div className="col-12 text-danger">
                          {errorMessage}
                        </div>
                      )}
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary px-4 float-end mt-4">
                          <i className="fas fa-sign-in-alt"></i> &nbsp;Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-5 ps-0 d-none d-md-block">
                  <div className="form-right h-100 bg-primary text-white text-center pt-5">
                    <i className="fas fa-users"></i>
                    <h2 className="fs-1">Welcome Back!!!</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
