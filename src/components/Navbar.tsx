
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';

const Navbar = () => {
  const { user } = useAppContext();


  return (
    <header className="bg-blue-700">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-white">SkyHopper</div>
        </Link>
        
        <div className='flex items-center space-x-8'>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:scale-105 transition-all duration-200">
              Home
            </Link>
            <Link to="/bookings" className="text-white hover:scale-105 transition-all duration-200">
              My Bookings
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              <span className='max-sm:hidden'>Balance:</span> ₹{user?.wallet?.toLocaleString() || 0}
            </div>
            <div className="w-8 h-8 bg-[#EEF6FE] text-blue-600 rounded-full flex items-center justify-center">
              {user?.name.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
