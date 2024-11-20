import React from 'react';
import { MdOutlineLightMode, } from "react-icons/md";
import { Link } from 'react-router-dom';
import PopUpProfile from './PopUpProfile';


const Navbar = () => {


  return (
    <div className="flex sticky top-0 z-50 bg-white shadow-md p-1">
      <nav className="flex justify-between mx-5 py-1 w-full">
        <h1 className="text-2xl font-bold text-black my-2 cursor-pointer">
          FUTURE<span className="text-sky-700">PATH</span>
        </h1>
        <ul className="flex justify-center space-x-1 my-3 ">
          <li className='flex'>
            <Link to="/Home" className="relative px-5 rounded-lg text-black hover:text-sky-700 transition-color duration-300 group ">
              Beranda
              <span className="block h-0.5 w-full bg-sky-700 transition-all duration-500 transform scale-x-0 group-hover:scale-x-125 group-focus:scale-x-125"></span>
            </Link>
          </li>
          <li className='flex'>
            <Link to="/News" className="relative px-5 rounded-lg text-black hover:text-sky-700 transition-color duration-300 group">
              Berita
              <span className="block h-0.5 w-full bg-sky-700 transition-all duration-500 transform scale-x-0 group-hover:scale-x-125 group-focus:scale-x-125"></span>
            </Link>
          </li>
          <li className='flex'>
            <Link to="/List" className="relative px-5 rounded-lg text-black hover:text-sky-700 transition-color duration-300 group group">
              Pilihan
              <span className="block h-0.5 w-full bg-sky-600 transition-all duration-500 transform scale-x-0 group-hover:scale-x-125 group-focus:scale-x-125"></span>
            </Link>
          </li>
          <li className='flex'>
            <Link to="/FAQ" className="relative px-5 rounded-lg text-center items-center text-black hover:text-sky-700 transition-color duration-300 focus: group">
              Faq
              <span className="block h-0.5 w-full bg-sky-600 transition-all duration-500 transform scale-x-0 group-hover:scale-x-125 group-focus:scale-x-125"></span>
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-5">
          <div className="cursor-pointer flex">
          </div>
          <MdOutlineLightMode size={25} />
          <div>
            <PopUpProfile />
          </div>
          {/* <div className='p-2 border rounded-xl cursor-pointer text bg-red-800'>Keluar</div> */}
        </div>
      </nav>

    </div>
  );
};

export default Navbar;