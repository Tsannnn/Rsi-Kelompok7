// src/Navbar.js
import React from 'react';
import { MdOutlineSearch, MdOutlineLightMode } from "react-icons/md";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex sticky top-0 z-50 bg-white shadow-md rounded-xl p-1">
      <nav className="flex justify-between mx-5 p-3 w-full">
        <h1 className="text-xl font-bold text-black cursor-pointer">
          FUTURE<span className="text-sky-600">PATH</span>
        </h1>
        <ul className="flex space-x-20 ">
          <li>
            <Link to="/Home" className="relative text-black hover:text-sky-600 group">
              Beranda
              <span className="block h-0.5 w-full bg-sky-600 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          </li>
          <li>
            <Link to="/News" className="relative text-black hover:text-sky-600 group">
              Berita
              <span className="block h-0.5 w-full bg-sky-600 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          </li>
          <li>
            <Link to="/List" className="relative text-black hover:text-sky-600 group">
              Pilihan
              <span className="block h-0.5 w-full bg-sky-600 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          </li>
          <li>
            <Link to="/FAQ"className="relative text-black hover:text-sky-600 group">
              Faq
              <span className="block h-0.5 w-full bg-sky-600 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <div className="cursor-pointer">
          <MdOutlineSearch size={25} onMouseOver={({target})=>target.style.color="darkblue"} onMouseOut={({target})=>target.style.color="black"}/>
          </div>
          <MdOutlineLightMode size={25} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;