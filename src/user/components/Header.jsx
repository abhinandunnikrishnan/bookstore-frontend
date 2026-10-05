import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaUser } from 'react-icons/fa'
import { IoMdMenu } from 'react-icons/io'
import { Link } from 'react-router-dom'

function Header() {
    const[toggle,setToggle]=useState(false)
  return (
    <>
        {/* header top part */}
        <div className='grid grid-cols-3 p-5'>
            {/* logo */}
            <div className='flex items-center'>
                <img width={'50px'} height={'50px'} src="https://cdn.pixabay.com/photo/2017/01/31/00/09/books-2022464_1280.png" alt="books" />
                <div className="text-2xl font-bold ms-2 md:hidden">BOOKSTORE</div>
            </div>
            {/* title */}
            <div className='md:flex justify-center items-center hidden'>
                <h1 className='text-3xl font-bold'>BOOKSTORE</h1>
            </div>
            {/* login */}
            <div className='md:flex justify-end items-center hidden'>
                <FaInstagram />
                <FaTwitter className='mx-2'/>
                <FaFacebookF />
                {/* login link*/}
                <Link to={'/login'} className='border border-black rounded px-3 ms-3 flex items-center'><FaUser className='me-1'/>Login</Link>
            </div>
        </div>
        {/* navigation part */}
        <nav className='bg-black w-full p-3 text-white md:flex justify-center items-center'>
            {/* menu icon & login button */}
            <div className='flex justify-between items-center text-2xl py-2 md:hidden'>
                <button onClick={()=>setToggle(!toggle)}><IoMdMenu /></button>
                <Link to={'/login'} className='border border-black rounded px-3 ms-3 flex items-center hover:bg-white hover:text-black'><FaUser className='me-1'/>Login</Link>

            </div>
            <ul className={toggle?'flex flex-col':'md:flex hidden'}>
                <li><Link to={'/'} className='md:mx-4 mt-2 md:mt-0'>HOME</Link></li>
                <li><Link to={'/books'} className='md:mx-4 mt-2 md:mt-0'>BOOKS</Link></li>
                <li><Link to={'/contact'} className='md:mx-4 mt-2 md:mt-0'>CONTACT</Link></li>
            </ul>
        </nav>
    </>
  )
}

export default Header