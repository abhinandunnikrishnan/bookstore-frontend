import React, { useEffect, useState } from 'react'
import { deleteUserBooksApi, getUserBooksApi } from '../../services/allApi'

function BookStatus() {
    const [uploadBooks,setUploadBooks]=useState([])

    useEffect(()=>{
        getUploadBooks()
    },[])

    const getUploadBooks=async()=>{
        const result= await getUserBooksApi()
        setUploadBooks(result.data)
    }

    const deleteBook = async(id)=>{
        const result = await deleteUserBooksApi(id)
        getUploadBooks()
    }

  return (
    <div className='p-10 my-15 shadow rounded'>
        {/* duplicate book */}
        {
            uploadBooks?.length>0?
            uploadBooks?.map(book=>(
                <div className='p-5 rounded mt-4 bg-blue-100'>
                    <div className='md:grid grid-cols-[3fr_1fr]'>
                        <div className='px-4'>
                            <h1 className='text-2xl'>{book?.title}</h1>
                            <h2 className='text-xl'>{book?.author}</h2>
                            <h3 className='text-lg text-blue-700'>₹ {book?.discountedPrice}</h3>
                            <p className='text-justify'>{book?.abstract}</p>
                            {/* status image */}
                            <div className='flex my-3'>
                                {
                                    book?.status=="pending" ?
                                    <img width={'120px'} height={'120px'} src="https://allure-d.com/Images/Body/pending.png" alt="pending" />
                                    :
                                    book?.status=="approved"?
                                    <img width={'120px'} height={'120px'} src="https://static.vecteezy.com/system/resources/previews/024/382/871/non_2x/approved-sign-symbol-icon-label-stamp-green-round-design-transparent-background-free-png.png" alt="approved" />
                                    :
                                    <img width={'120px'} height={'120px'} src="https://png.pngtree.com/png-clipart/20230915/original/pngtree-circle-sold-out-red-stamp-vector-png-image_12224645.png" alt="sold" />
                                
                                }
                            </div>
                        </div>
                        <div className='px-4 mt-4 md:mt-0'>
                            <img className='w-full' src={book?.imageUrl} alt="book" />
                            <div className='mt-4 flex justify-end'>
                                <button onClick={()=>deleteBook(book?._id)} className='bg-red-700 text-white p-2 rounded'>Delete</button>
                            </div>
                        </div>

                    </div>

                </div>
            ))
            :
            <div className='text-center font-bold my-5'>No books uploaded</div>
        }
    </div>
  )
}

export default BookStatus