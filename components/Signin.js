import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        height: '90vh', // Adjust height to ensure it takes up most of the viewport
        padding: '30px',
        margin: '0 auto',
        width: '100%',
        maxWidth: '400px', // Ensure it's not too wide on large screens
      }}
    >
      <h1>Hi there!</h1>
      <p>Click the button below to login!</p>
      <Button type="button" size="lg" className="w-75" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
