import React from 'react';
import Header from '../components/Header';

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white">
      <Header />
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-5 text-center border-b-2 border-white pb-3">
          About Page
        </h1>
        <p className="text-lg leading-relaxed mb-8 text-center">
          Welcome to the About Page! This is where you can include information about your application.
        </p>

        <div className="bg-white text-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold mb-5 text-blue-600 text-center">
            About This Project
          </h1>
          <p className="text-lg mb-5 text-gray-700">
            This is a password reset application built with React and Node.js.
          </p>
          <ul className="list-disc list-inside space-y-3">
            <li className="text-gray-700">
              <span className="font-semibold text-blue-600">Secure Reset:</span> Users can reset their password securely.
            </li>
            <li className="text-gray-700">
              <span className="font-semibold text-blue-600">Email Verification:</span> Emails are verified before resetting the password.
            </li>
            <li className="text-gray-700">
              <span className="font-semibold text-blue-600">Modern Security:</span> The application follows modern security practices.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
