import React, { useEffect, useState } from 'react'
//import Logo from '../../assets/Logo.png';
import { Link as ScrollLink} from 'react-scroll';
import { Link } from 'react-router-dom';
import { FaXmark, FaBars } from 'react-icons/fa6';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
        if(window.scrollY > 100){
            setIsSticky(true);
        }else{
            setIsSticky(false);
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.addEventListener('scroll', handleScroll);
    }
  });

  const navItems = [
    {link: "Home", path: "home"},
    {link: "About", path: "about"},
    {link: "Services", path: "services"},
    {link: "Product", path: "product"},
    {link: "Testimonials", path: "testimonials"},
    {link: "FAQ", path: "faq"},
  ];

  return (
    <header className='w-full bg-white md:bg-transparent fixed top-0 left-0 right-0'>
        <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 left-0 right-0 border bg-white duration-300" : ""}`}>
            <div className='flex justify-between items-center text-base gap-8'>
                <a href="#" className='h-8 transition-transform duration-300 hover:scale-10'>
                    <img src="../../assets/Logo.png" alt="Logo" className=''/>
                </a>

                {/*Mobile Menu*/}
                <ul className='md:flex space-x-12 hidden'>
                    {
                        navItems.map(({link, path}) => 
                            <ScrollLink to = {path} 
                                  spy = {true} 
                                  smooth = {true} 
                                  offset = {-100}  
                                  key={path} 
                                  className='block text-base text-gray900 hover:text-brandPrimary first:font-medium cursor-pointer'>
                                {link}
                            </ScrollLink>
                        )
                    }
                </ul>

                {/*btn for large devices */}
                <div className='space-x-12 hidden lg:flex items-center'>
                    <Link to='/login' className='hidden lg:flex items-center text-brandSecondary hover:text-gray900'>Login</Link>
                    <Link to='/signup' className='bg-brandSecondary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralDGrey'>Sign Up</Link>
                </div>

                {/* menu btn for only mobile device*/}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-neutralDGrey focus:outline-none focus:text-gray-500'>
                        {
                            isMenuOpen ? (<FaXmark className='h-6 w-6'/>) : (<FaBars className='h-6 w-6'/>)
                        }
                    </button>
                </div>
            </div>
            
            {/*Mobile Menu*/}
            <div className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                {
                        navItems.map(({link, path}) => 
                            <ScrollLink to = {path} 
                                  spy = {true} 
                                  smooth = {true} 
                                  offset = {-100}  
                                  key={path} 
                                  className='block text-base text-white hover:text-brandPrimary first:font-medium'>
                                {link}
                            </ScrollLink>
                        )
                    }
            </div>
        </nav>
    </header>
    );
};

export default Navbar
