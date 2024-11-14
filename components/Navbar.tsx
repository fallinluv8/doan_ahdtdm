'use client';

import React, { useState, useEffect } from 'react';
import { navItems } from '@/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faListAlt,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onSelectPage }: { onSelectPage: (page: string) => void }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Effect to apply dark mode class to HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleNav = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <div className='sticky top-0 z-50 dark:backdrop-blur-lg backdrop-blur-md border-b border-sky-700/80 dark:text-white'>
      <div className='container px-4 mx-auto relative lg:text-sm'>
        <div className='flex justify-between items-center'>
          <div
            onClick={() => onSelectPage('HomePage')}
            className='flex items-center flex-shrink-0'
          >
            <img className='h-12 w-12 mr-2' src='img/logo.jpg' alt='logo' />
            <div className='flex flex-col md:text-2xl text-xl tracking-tight'>
              <span>Page Replacement</span>
              <span>Algorithms</span>
            </div>
          </div>
          <ul className='hidden lg:flex space-x-32 text-xl'>
            {navItems.map((item, index) => (
              <li
                className='hover:text-sky-500 hover:scale-105 transition ease-in-out opacity-80 hover:opacity-100'
                key={index}
                onClick={() => onSelectPage(item.label)}
              >
                <a href='#'>{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Nút chuyển đổi chế độ sáng/tối */}
          <div>
            <button
              className='text-3xl text-yellow-600 hidden lg:block hover:text-yellow-400 hover:scale-95'
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <FontAwesomeIcon icon={faMoon} />
              ) : (
                <FontAwesomeIcon icon={faSun} />
              )}
            </button>
          </div>

          <div className='lg:hidden md:flex flex-col justify-end'>
            <button className='text-3xl' onClick={toggleNav}>
              {mobileDrawerOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faListAlt} />
              )}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className='fixed right-0 z-20 bg-sky-400 w-full p-6 text-xl flex flex-col justify-center items-center lg:hidden text-black dark:text-white dark:bg-sky-800'>
            <ul>
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className='py-2 hover:text-sky-500 hover:scale-105 transition ease-in-out opacity-80 hover:opacity-100'
                  onClick={() => onSelectPage(item.label)}
                >
                  <a href='#'>{item.label}</a>
                </li>
              ))}
            </ul>
            {/* Nút chuyển đổi chế độ sáng/tối */}
            <div>
              <button
                className='text-3xl text-yellow-600'
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <FontAwesomeIcon icon={faMoon} />
                ) : (
                  <FontAwesomeIcon icon={faSun} /> //
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
