import React from 'react';
import { Navbar } from '../navbar';

const PageWithNavbar = ({ children }) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='w-full md:h-20 lg:h-20 h-32'>
        <Navbar />
      </div>
      <div className="md:mt-20 lg:mt-20 flex flex-row w-full">
        <div className='w-full'>{children}</div>
      </div>
    </div>
  );
}

export default PageWithNavbar;