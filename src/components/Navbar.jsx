import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logoLight from '../assets/logo_dark.png'; 
import logoDark from '../assets/logo.png'; 
import menuLight from '../assets/menu-white.png'; 
import menuDark from '../assets/menu-black.png'; 
import iconLight from '../assets/arrow-icon-dark.png'; 
import iconDark from '../assets/arrow-icon.png'; 
import { useTheme } from '../hooks/useTheme'; 

const Header = () => {
  const { theme } = useTheme(); 
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


  const logo = theme === 'dark' ? logoLight : logoDark
  const menuIcon = theme === 'dark' ? menuLight : menuDark
  const arrowIcon = theme === 'dark' ? iconLight : iconDark
  const menuBgClass = theme === 'dark' ? ' text-white ' : 'text-black'
  const navBgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-white'


  return (
    <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-5 flex items-center justify-between z-50 ${isScroll ? "bg-d/20 backdrop-blur-lg shadow-sm" : ''} `}>

      <Link to="/">
        <img src={logo} className='w-28 cursor-pointer mr-14' alt='Logo'/>
      </Link>

      {/* Menu desktop */}
      <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 p-5 ${isScroll ? "" : 'menuBgClass shadow-xl  '}`}>
        <li><a className={` ${menuBgClass} transition-colors font-medium`} href="/">Home</a></li>
        <li><a className={` ${menuBgClass} transition-colors font-medium`} href="/">Al-Quran</a></li>
        <li><a className={` ${menuBgClass} transition-colors font-medium`} href="/a">Al-Ma'tsurat</a></li>
        <li><a className={` ${menuBgClass} transition-colors font-medium`} href="/a">Doa-doa</a></li>
      </ul>

      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <a href="#contact" className={`hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Contact <img src={arrowIcon} className='w-3 py-3' alt='Contact' />
        </a>
        <button className='block md:hidden ml-3' onClick={openMenu} aria-label="Open menu">
          <img src={menuIcon} alt='Menu' className='w-6'/>
        </button>
      </div>

      {/* Mobile Menu */}
      <ul className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed top-0 bottom-0 w-64 z-50 h-screen  shadow-2xl transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'right-0' : '-right-64'
      } ${navBgClass}`}>
        
        {/* Tombol close */}
        <div className='absolute right-6 top-6 cursor-pointer' onClick={closeMenu} aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${menuBgClass} w-8 h-8`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        {/* Link menu mobile */}
        <li><a className={` ${menuBgClass} transition-colors font-medium`} onClick={closeMenu} href="/">Home</a></li>
        <li><a className={` ${menuBgClass} transition-colors font-medium`} onClick={closeMenu} href="/">Al-Quran</a></li>
        <li><a className={` ${menuBgClass} transition-colors font-medium`} onClick={closeMenu} href="/a">Al-Ma'tsurat</a></li>
        <li><a className={` ${menuBgClass} transition-colors font-medium`} onClick={closeMenu} href="/a">Doa-doa</a></li>
      </ul>
    </nav>
  );
}

export default Header;