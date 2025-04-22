import React, { useState } from 'react';

export default function LoginRegistration() {
  const [view, setView] = useState('userTypeSelection');
  const [userType, setUserType] = useState('');
  const [entityType, setEntityType] = useState('');
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setView('entityTypeSelection');
  };

  const handleEntityTypeSelection = (type) => {
    setEntityType(type);
    setView('registrationForm');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', { userType, entityType, ...formData });
    setView('registrationSuccess');
  };

  const switchToLogin = () => {
    setView('login');
  };

  const switchToRegistration = () => {
    setView('userTypeSelection');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
    setView('loginSuccess');
  };

  const renderUserTypeSelection = () => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Join Our Food Donation Network</h2>
      <p className="text-gray-600 mb-6 text-center">Please select your user type:</p>
      <div className="space-y-4">
        <button 
          onClick={() => handleUserTypeSelection('Donor')}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
        >
          I want to Donate Food
        </button>
        <button 
          onClick={() => handleUserTypeSelection('Receiver')}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          I want to Receive Donations
        </button>
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-600">Already have an account? <button onClick={switchToLogin} className="text-green-600 hover:underline">Sign In</button></p>
      </div>
    </div>
  );

  const renderEntityTypeSelection = () => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        {userType === 'Donor' ? 'Donor Registration' : 'Receiver Registration'}
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        {userType === 'Donor' 
          ? 'Are you an Individual or an Organization?' 
          : 'Are you an NGO or other type of organization?'
        }
      </p>
      <div className="space-y-4">
        <button 
          onClick={() => handleEntityTypeSelection(userType === 'Donor' ? 'Individual' : 'NGO')}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
        >
          {userType === 'Donor' ? 'Individual' : 'NGO'}
        </button>
        <button 
          onClick={() => handleEntityTypeSelection(userType === 'Donor' ? 'Organization' : 'Other')}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {userType === 'Donor' ? 'Organization' : 'Other Organization'}
        </button>
      </div>
      <div className="mt-6">
        <button onClick={() => setView('userTypeSelection')} className="text-gray-600 hover:underline">
          &larr; Back
        </button>
      </div>
    </div>
  );

  const renderRegistrationForm = () => {
    const formFields = [];
    
    if (userType === 'Donor') {
      if (entityType === 'Individual') {
        formFields.push(
          { name: 'fullName', label: 'Full Name', type: 'text' },
          { name: 'email', label: 'Email Address', type: 'email' },
          { name: 'phone', label: 'Phone Number', type: 'tel' },
          { name: 'address', label: 'Address', type: 'text' },
          { name: 'password', label: 'Create Password', type: 'password' },
          { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
        );
      } else if (entityType === 'Organization') {
        formFields.push(
          { name: 'orgName', label: 'Organization Name', type: 'text' },
          { name: 'licenseId', label: 'FSSAI/Food License ID', type: 'text' },
          { name: 'email', label: 'Email Address', type: 'email' },
          { name: 'phone', label: 'Phone Number', type: 'tel' },
          { name: 'address', label: 'Address', type: 'text' },
          { name: 'password', label: 'Create Password', type: 'password' },
          { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
        );
      }
    } else if (userType === 'Receiver') {
      if (entityType === 'NGO') {
        formFields.push(
          { name: 'ngoName', label: 'NGO Name', type: 'text' },
          { name: 'darpanId', label: 'NGO Darpan ID', type: 'text' },
          { name: 'email', label: 'Email Address', type: 'email' },
          { name: 'phone', label: 'Phone Number', type: 'tel' },
          { name: 'address', label: 'Address', type: 'text' },
          { name: 'password', label: 'Create Password', type: 'password' },
          { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
        );
      } else if (entityType === 'Other') {
        formFields.push(
          { name: 'orgName', label: 'Organization Name', type: 'text' },
          { name: 'regDetails', label: 'Organization Registration Details', type: 'text' },
          { name: 'email', label: 'Email Address', type: 'email' },
          { name: 'phone', label: 'Phone Number', type: 'tel' },
          { name: 'address', label: 'Address', type: 'text' },
          { name: 'password', label: 'Create Password', type: 'password' },
          { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
        );
      }
    }

    const categoryTitle = 
      userType === 'Donor' 
        ? (entityType === 'Individual' ? 'Individual Donor Registration' : 'Organization Donor Registration')
        : (entityType === 'NGO' ? 'NGO Registration' : 'Other Organization Registration');

    return (
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">{categoryTitle}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 mb-1" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          ))}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-6">
          <button onClick={() => setView('entityTypeSelection')} className="text-gray-600 hover:underline">
            &larr; Back
          </button>
        </div>
      </div>
    );
  };

  const renderLogin = () => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Sign In</h2>
      <div className="space-y-4 mb-6">
        <button
          className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign in with Google
        </button>
      </div>
      <div className="flex items-center mb-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-600">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="text-right">
          <a href="#" className="text-green-600 hover:underline text-sm">Forgot password?</a>
        </div>
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-600">Don't have an account? <button onClick={switchToRegistration} className="text-green-600 hover:underline">Register</button></p>
      </div>
    </div>
  );

  const renderRegistrationSuccess = () => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 p-3 rounded-full">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Registration Successful!</h2>
      <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
      <button 
        onClick={switchToLogin} 
        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
      >
        Sign In to Your Account
      </button>
    </div>
  );

  const renderLoginSuccess = () => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 p-3 rounded-full">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Login Successful!</h2>
      <p className="text-gray-600 mb-6">You have been successfully logged in.</p>
      <button 
        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
      >
        Go to Dashboard
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {view === 'userTypeSelection' && renderUserTypeSelection()}
        {view === 'entityTypeSelection' && renderEntityTypeSelection()}
        {view === 'registrationForm' && renderRegistrationForm()}
        {view === 'login' && renderLogin()}
        {view === 'registrationSuccess' && renderRegistrationSuccess()}
        {view === 'loginSuccess' && renderLoginSuccess()}
      </div>
    </div>
  );
}