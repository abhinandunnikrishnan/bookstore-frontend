import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
      <img className='w-100' src="https://www.chainreaction.ae/wp-content/themes/chainreaction_new2021/assets/404.gif" alt="pnf" />
      <p>Oh No!</p>
      <h3 className='text-2xl font-medium'>Look Like You're Lost</h3>
      <p>The Page You Are Looking For Is Not Available</p>
      <Link to={'/'} className='bg-black mt-5 px-3 py-2 text-white'>Back To Home</Link>
    </div>
  )
}

export default Pnf