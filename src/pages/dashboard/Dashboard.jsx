import React from 'react';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default function Dashboard() {
  const navigate = useNavigate(); // React Router's hook for navigation

  const logout = () => {
    // Clear authentication token from localStorage
    localStorage.removeItem('authToken');

    // Optionally, show a logout success message (e.g., using toastr or alert)
    toastr.success('Logged out successfully');
    // Redirect to login page
    navigate('/');
  };

  return (
    <div>
      <div className="dashboard-page">
        <h1>Welcome to the Dashboard!</h1>
        <button className="btn btn-info" onClick={logout}>Logout</button>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}
