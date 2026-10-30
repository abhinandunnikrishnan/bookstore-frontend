import React, { useContext, useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram, FaPowerOff, FaTwitter, FaUser } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { IoMdMenu } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import { routeContext } from '../../contextAPI/RouteGuard'

function Header() {
    const{role,setRole,authorisedUser,setAuthorisedUser} = useContext(routeContext)

    const[toggle,setToggle]=useState(false)
    const[token,setToken]=useState("")
    const[dp,setDp]=useState("")
    const[userId,setUserId]=useState("")
    const[dropDown,setDropDown]=useState(false)
    const navigate =useNavigate()

    useEffect(()=>{
        if(sessionStorage.getItem("token")&&sessionStorage.getItem("user")){
            const userToken =sessionStorage.getItem("token")
            const user = JSON.parse(sessionStorage.getItem("user"))
            setToken(userToken)
            setDp(user.picture)
            setUserId(user._id)
        }
    },[token])
    console.log(dp);
    
    const logout=()=>{
    sessionStorage.clear()
    setAuthorisedUser(false)
    setToggle(false)
    setToken("")
    setDp("")
    setUserId("")
    setDropDown(false)
    navigate('/')
  }

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
                {
                    !token ?
                    <Link to={'/login'} className='border border-black rounded px-3 ms-3 flex items-center'><FaUser className='me-1'/>Login</Link>
                    :
                    <div>
                        <button onClick={()=>setDropDown(!dropDown)} className=' rounded p-1 hover:bg-gray-200'>
                            <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} src={dp=="" ? "https://tse3.mm.bing.net/th/id/OIP.E81zRhO0Ky8Ykiu-6t-2FAHaHa?r=0&pid=Api&h=220&P=0":dp.startsWith("https://lh3.googleusercontent.com")?dp:`${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="user" />
                        </button>
                        {/* dropdown menu */}
                        {
                            dropDown &&
                            <div className='absolute right-0 z-10 mt-2 w-40 bg-white shadow rounded ring-1 ring-black/5 p-2 focus:outline-hidden'>
                            <Link to={`/profile/${userId}`} className='flex items-center text-gray-600 text-sm px-3 py-2'><FaGear/> Profile</Link>
                            <button onClick={logout} className='flex items-center text-gray-600 text-sm px-3 py-2'><FaPowerOff className='me-1'/> logout</button>
                            </div>
                        }
                    </div>
                    
                }
                
            </div>
        </div>
        {/* navigation part */}
        <nav className='bg-black w-full p-3 text-white md:flex justify-center items-center'>
            {/* menu icon & login button */}
            <div className='flex justify-between items-center text-2xl py-2 md:hidden'>
                <button onClick={()=>setToggle(!toggle)}><IoMdMenu /></button>
                {
                    !token?
                    <Link to={'/login'} className='border border-black rounded px-3 ms-3 flex items-center hover:bg-white hover:text-black'><FaUser className='me-1'/>Login</Link>
                    :
                    <div>
                        <button onClick={()=>setDropDown(!dropDown)} className=' rounded p-1 hover:bg-gray-200'>
                            <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} src={dp=="" ? "https://tse3.mm.bing.net/th/id/OIP.E81zRhO0Ky8Ykiu-6t-2FAHaHa?r=0&pid=Api&h=220&P=0":dp.startsWith("http://lh3.googleusercontent.com/")?dp:`${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="profile" />
                        </button>
                        {/* dropdown menu */}
                        {
                            dropDown &&
                            <div className='absolute right-0 z-10 mt-2 w-40 bg-white shadow rounded ring-1 ring-black/5 p-2 focus:outline-hidden'>
                            <Link to={`/profile/${userId}`} className='flex items-center text-gray-600 text-sm px-3 py-2'><FaGear/> Profile</Link>
                            <button onClick={logout} className='flex items-center text-gray-600 text-sm px-3 py-2'><FaPowerOff className='me-1'/> logout</button>
                            </div>
                        }
                    </div>

                }
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