import React, { useEffect, useState } from 'react'
import { getUserBroughtBooksApi } from '../../services/allApi'

function Purchase() {
    const [purchaseBooks,setPurchaseBooks]=useState([])
    
        useEffect(()=>{
            getPurchaseBooks()
        },[])
    
        const getPurchaseBooks=async()=>{
            const result= await getUserBroughtBooksApi()
            setPurchaseBooks(result.data)
        }

  return (
    <div className='p-10 my-15 shadow rounded'>
        {/* duplicate book */}
        {
            purchaseBooks?.length>0 ?
            purchaseBooks?.map(book=>(
                <div className='p-5 rounded mt-4 bg-blue-100'>
                    <div className='md:grid grid-cols-[3fr_1fr]'>
                        <div className='px-4'>
                            <h1 className='text-2xl'>{book?.title}</h1>
                            <h2 className='text-xl'>{book?.author}</h2>
                            <h3 className='text-lg text-blue-700'>₹ {book?.discountedPrice}</h3>
                            <p className='text-justify'>{book?.abstract}</p>
                            {/* status image */}
                            <div className='flex my-3'>
                                <img width={'120px'} height={'120px'} src="https://media.istockphoto.com/id/2176343328/vector/grunge-blue-purchased-word-round-rubber-seal-stamp-on-white-background.jpg?s=612x612&w=0&k=20&c=Lb1E43jd8ZLXXGgYlSOtCsECOEsuXfKi_ohsi0tWakE=" alt="purchase" />
                                
                            </div>
                        </div>
                        <div className='px-4 mt-4 md:mt-0'>
                            <img className='w-full' src={book?.imageUrl} alt="book" />
                            
                        </div>

                    </div>

                </div>
            ))
            :
            <div className='text-center font-bold my-5'>No books purchased!!</div>
        }
    </div>
  )
}

export default Purchase