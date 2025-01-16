import React from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
      <div className="bg-[#010101] fixed top-0 left-0 min-h-full w-[240px] pl-4 pr-10">
        <div className="flex flex-col gap-5 mt-10 pl-2">
          <NavLink to='/add-song' className='flex items-center text-white font-bold'>
            <p>Add Song</p>
          </NavLink>
          <NavLink to='/add-album' className='flex items-center text-white font-bold'>
            <p>Add Album</p>
          </NavLink>
          <NavLink to='/list-song' className='flex items-center text-white font-bold'>
            <p>List Song</p>
          </NavLink>
          <NavLink to='/list-album' className='flex items-center text-white font-bold'>
            <p>List Album</p>
          </NavLink>
        </div>
      </div>
    );
  };
  
  
  export default Sidebar;