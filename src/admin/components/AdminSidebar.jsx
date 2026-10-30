import React, { useEffect,useState } from 'react'
import { FaChartBar, FaDatabase } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'


function AdminSidebar() {
   const[username,setUsername]=useState("")
  const[dp,setDp]=useState("")

  useEffect(()=>{
        if(sessionStorage.getItem("token")&&sessionStorage.getItem("user")){
          const user = JSON.parse(sessionStorage.getItem("user"))
          setDp(user?.picture)
          setUsername(user?.username)
        }
      },[])

  return (
    <div className='bg-blue-100 md:min-h-screen h-fit py-10'>
      {/* image */}
      <div className='flex justify-center'>
        <img style={{width:'150px',height:'150px', borderRadius:'50%'}} src={dp=="" ? "https://tse3.mm.bing.net/th/id/OIP.E81zRhO0Ky8Ykiu-6t-2FAHaHa?r=0&pid=Api&h=220&P=0":dp.startsWith("http://lh3.googleusercontent.com/")?dp:`${axiosInstance.defaults.baseURL}/uploads/${dp}`}alt="admin" />
      </div>
      {/* name */}
      <h3 className='text-xl font-bold my-5 text-center'>{username}</h3>
      {/* links */}
      <div className='mt-10 flex flex-col justify-center items-center'>
        <div className='mt-3'>
          <Link to={'/admin'} className='flex items-center'> <FaChartBar className='me-2' />Dashboard</Link>
        </div>
        <div className='mt-3'>
          <Link to={'/admin/resources'} className='flex items-center'> <FaDatabase className='me-2' />Resources</Link>
        </div>
        <div className='mt-3'>
          <Link to={'/admin/settings'} className='flex items-center'> <FaGear className='me-2' />Settings</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar