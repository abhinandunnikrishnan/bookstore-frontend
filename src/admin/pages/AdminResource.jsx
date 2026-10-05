import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminResource() {
  const[currentTab,setCurrentTab]=useState(1)
  return (
    <>
      <AdminHeader/>
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar/>
        </div>
        <div className='col-span-4 p-10'>
          <h1 className='text-3xl font-bold text-center mb-10'>All Resources</h1>
          <div className='flex justify-center items-center my-8 font-medium text-lg'>
          <p onClick={()=>setCurrentTab(1)} className={currentTab==1 ?'p-4 border-gray-400 border-l border-t border-r rounded cursor-pointer':'p-4 border-gray-400 border-b rounded cursor-pointer'}>Books</p>
          <p onClick={()=>setCurrentTab(2)} className={currentTab==2 ?'p-4 border-gray-400 border-l border-t border-r rounded cursor-pointer':'p-4 border-gray-400 border-b rounded cursor-pointer'}>Users</p>
          
        </div>
        {/* tab content */}
        {
          currentTab==1 &&
          <div className='md:grid grid-cols-4 md:my-0'>
          {/* duplicating card */}
          <div className='shadow rounded p-3 m-4 md:my-0'>
            <img width={'100%'} height={'300px'} src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg" alt="book" />
            <div className='flex flex-col justify-center items-center mt-4'>
              <h2 className='text-blue-600 font-bold text-xl'>Author</h2>
              <h3 className='text-lg'>Title</h3>
              <p className='font-bold text-red-500'>Price</p>
              {/* approve button */}
              <button className='bg-green-600 text-white p-2 mt-2 w-full'>APPROVE</button>
            </div>
          </div>
        </div>
        }
        {
          currentTab==2 &&
          <div className='md:grid grid-cols-3 my-5 w-full'>
          {/* duplicating according to user */}
          <div className='shadow rounded p-2 m-2 bg-blue-100'>
            <p className='text-red-500 font-bold text-md'>ID:</p>
            <div className='flex mt-3 items-center'>
              <img width={'80px'} height={'80px'} style={{borderRadius:'50%'}} src="https://img.freepik.com/premium-photo/design-professional-profile-picture-with-sharp-focus-natural-lighting-clean-neutral-background_880763-20280.jpg?w=1060" alt="book" />
              <div className='flex flex-col ml-3 w-full'>
                <h4 className='text-blue-600 font-bold text-md'>Author</h4>                
                <p className='text-xs'>Mail</p>
            </div>
              
            </div>
          </div>
        </div>
        }
        </div>
      </div>
    </>
  )
}

export default AdminResource