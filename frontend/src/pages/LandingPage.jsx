import React from 'react';

const LandingPage = () => (
  <div>
    <h1>Welcome to SoulNest</h1>
    <p>This is the landing page. Update content as needed.</p>
    <a href="/login" className="text-primary font-medium hover:underline">
      Login
    </a>
    <a href="/signup" className="text-primary font-medium hover:underline ml-4">
      Sign Up
    </a>
  </div>
);

export default LandingPage;
