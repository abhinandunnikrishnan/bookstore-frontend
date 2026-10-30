import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
  return (
    <>
    <Header/>
    <div className='container min-h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10'>
            <div>
                <h1 className='text-blue-600 md:text-4xl font-bold'>Congartulations!!!!</h1>
                <p className='text-2xl my-10'>ThankYou For Your Purchase</p>
                <Link to={"/books"} className='flex items-center bg-blue-500 w-60 p-2 text-white font-bold rounded'>Explore More Books...</Link>
            </div>
            <div className='flex justify-center items-center'>
                <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="success" />
            </div>
        </div>

    </div>
    </>
  )
}

export default PaymentSuccess