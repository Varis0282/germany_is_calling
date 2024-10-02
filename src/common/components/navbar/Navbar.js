import React, { useState } from 'react'
import {
  HomeOutlined,
  HomeFilled
} from '@ant-design/icons';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const [isHovered, setIsHovered] = useState(false);


  return (
    <div className="flex flex-row w-full justify-between lg:px-32 md:px-20 px-3 py-8 lg:text-3xl md:text-2xl text-xl font-bold">
      <Link to={'/'} className='hover:text-white hover:bg-black px-4 py-1 rounded-full duration-300'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isHovered ? <HomeOutlined /> : <HomeFilled />}
      </Link>
      <Link to={'/'} className='cursor-pointer hover:text-white hover:bg-black px-4 py-1 rounded-full duration-300'>Germany Is Calling</Link>
      <div className='cursor-pointer hover:text-white hover:bg-black px-4 py-1 rounded-full duration-300'>
        <a href="https://www.github.com/Varis0282" target='_blank' rel='noreferrer'>Github</a>
      </div>
    </div>
  )
}

export default Navbar