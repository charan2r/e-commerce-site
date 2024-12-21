import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.status === 201) {
        alert('User registered successfully');
        window.location.href = '/login';
      } else {
        alert('Error registering user: ' + result.error);
      }
    } catch (error) {
      console.error('Error registering user', error);
      alert('Error registering user');
    }
  };

  return (
    <section id="register">
      <h2>Register</h2>
      <form id="register-form" className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
      <div className="additional-links">
        <button onClick={() => window.location.href = '/seller-register'} className="additional-btn">Register as a Seller</button>
        <button onClick={() => window.location.href = '/auth/login'} className="additional-btn">Already Registered? Login</button>
      </div>
    </section>
  );
};

export default Register;