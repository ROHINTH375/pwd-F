import React from 'react';
import Header from '../components/Header';

const About = () => {
  return (
    <div>
      <Header />
      <h1>About Page</h1>
      <p>Welcome to the About Page! This is where you can include information about your application.</p>
      <h1>About This Project</h1>
      <p>This is a password reset application built with React and Node.js.</p>
      <ul>
        <li>Users can reset their password securely.</li>
        <li>Emails are verified before resetting the password.</li>
        <li>The application follows modern security practices.</li>
      </ul>
    </div>
  );
};

export default About;



