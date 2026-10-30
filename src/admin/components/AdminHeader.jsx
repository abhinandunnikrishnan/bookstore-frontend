import React, { useContext } from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { routeContext } from '../../contextAPI/RouteGuard'

function AdminHeader() {
   const{role,setRole,authorisedUser,setAuthorisedUser} = useContext(routeContext)

  const navigate =useNavigate()

  const logout=()=>{
    sessionStorage.clear()
    setAuthorisedUser(false)
    navigate('/')
  }
  return (
    <>
    {/* header */}
    <div className='flex justify-between items-center p-3 md:mx-20'>
      <div className='flex items-center'>
        <img width={'50px'} height={'50px'} src="https://cdn.pixabay.com/photo/2017/01/31/00/09/books-2022464_1280.png" alt="icon" />
        <h1 className='text-2xl font-bold ms-2'>BOOKSTORE</h1>
      </div>
      <button onClick={logout} className='flex items-center px-3 py-2 bg-black text-white rounded border-black hover:bg-white hover:text-black'>Logout<FaPowerOff className='ms-2'/> </button>
    </div>
    {/* header marquee */}
    <div className='w-full p-3 bg-black text-white'>
      <marquee >Welcome Admin you are all set to manage and monitor the system. Let's get into work</marquee>
    </div>
    </>
  )
}

export default AdminHeader