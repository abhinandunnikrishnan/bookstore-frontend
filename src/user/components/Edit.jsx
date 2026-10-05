import React, { useState } from 'react'
import { FaPen, FaPencilAlt } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

function Edit() {
    const[offCanvas,setOffCanvas]=useState(false)
  return (
    <div>
        {/* button */}
        <button onClick={()=>setOffCanvas(true)} className='bg-black text-white p-2 flex items-center rounded border hover:bg-white hover:text-black'><FaPencilAlt className='me-2'/> Edit</button>
        {/* offcanvas */}
        {
            offCanvas &&
            <div>
                <div className='fixed inset-0 bg-gray-400/75 w-full h-full'></div>
                <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
                    {/* header */}
                    <div className='bg-black text-white px-3 py-4 flex justify-between text-2xl'>
                        <h1>Update User Profile</h1>
                        <FaX onClick={()=>setOffCanvas(false)}/>
                    </div>
                    {/* body */}
                    <div className='flex justify-center items-center flex-col my-5'>
                        <label htmlFor="userProfile">
                            <input type="file" id='userProfile' hidden />
                            <img  src="https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png" alt="user" />
                            <button className='bg-black text-white px-3 py-4 rounded z-53 fixed' style={{marginLeft:'250px',marginTop:'-40px'}}><FaPen/></button>
                        </label>
                        {/* username */}
                        <div className='mt-5 mb-3 w-full px-5'>
                            <input type="text" placeholder='username' className='w-full border border-gray-200 rounded p-2' />
                        </div>
                        {/* new passwprd */}
                        <div className='mt-3 mb-3 w-full px-5'>
                            <input type="text" placeholder='password' className='w-full border border-gray-200 rounded p-2' />
                        </div>
                        {/* confirm password */}
                        <div className='mt-3 mb-3 w-full px-5'>
                            <input type="text" placeholder='confirm password' className='w-full border border-gray-200 rounded p-2' />
                        </div>
                        {/* bio */}
                        <div className='mt-3 mb-3 w-full px-5'>
                            <input type="text" placeholder='bio' className='w-full border border-gray-200 rounded p-2' />
                        </div>
                        {/* reset and updatw button */}
                        <div className='flex justify-end w-full px-5 mt-5'>
                            <button className='bg-yellow-500 text-white p-2 rounded me-5'>Reset</button>
                            <button className='bg-green-700 text-white p-2 rounded'>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
    
  )
}

export default Edit