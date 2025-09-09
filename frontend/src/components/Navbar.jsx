import React from 'react';

const Navbar = () => (
  <nav className="w-full bg-white shadow p-4 fixed top-0 left-0 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <span className="font-bold text-xl text-blue-600">SoulNest</span>
      <div className="space-x-4">
        <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
        <a href="/tos" className="text-gray-700 hover:text-blue-600">TOS</a>
      </div>
    </div>
  </nav>
);

export default Navbar;
