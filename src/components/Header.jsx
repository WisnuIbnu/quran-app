import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // PENTING: Untuk navigasi halaman
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo_dark.png'; 
import menu from '../assets/menu-white.png'; // Ganti dengan path yang sesuai

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? "bg-white/20 dark:bg-black/20 backdrop-blur-lg shadow-sm" : ''}`}>

      <Link to="/">
        <img src={logo} className='w-28 cursor-pointer mr-14' alt='Logo'/>
      </Link>

      {/* Menu desktop tetap menggunakan <a> untuk anchor links */}
      <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 p-4 ${isScroll ? "" : 'bg-white dark:bg-gray-800 shadow-xl'}`}>
        <li><a className='text-white' href="/">Home</a></li>
      </ul>

      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <a href="#contact" className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4'>
          Contact <img src={logo} className='w-3 text-white' alt='Contact' />
        </a>
        <button className='block md:hidden ml-3' onClick={openMenu} aria-label="Open menu">
          <img src={menu} alt='Menu' className='w-6'/>
        </button>
      </div>

      {/* Mobile Menu (dikontrol oleh state) */}
      <ul className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed top-0 bottom-0 w-64 z-50 h-screen bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 ease-in-out ${isMenuOpen ? 'right-0' : '-right-64'}`}>
        {/* Tombol close yang terlihat */}
        <div className='absolute right-6 top-6 cursor-pointer' onClick={closeMenu} aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-800 dark:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        {/* Link menu mobile, onClick ditambahkan untuk menutup menu setelah diklik */}
        <li><a className='text-white' onClick={closeMenu} href="/">Home</a></li>
       
      </ul>
    </nav>
  );
}

export default Header;