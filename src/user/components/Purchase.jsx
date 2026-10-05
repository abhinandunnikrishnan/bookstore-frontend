import React from 'react'

function Purchase() {
  return (
    <div className='p-10 my-15 shadow rounded'>
        {/* duplicate book */}
        <div className='p-5 rounded mt-4 bg-blue-100'>
            <div className='md:grid grid-cols-[3fr_1fr]'>
                <div className='px-4'>
                    <h1 className='text-2xl'>Title</h1>
                    <h2 className='text-xl'>Author</h2>
                    <h3 className='text-lg text-blue-700'>$ discount price</h3>
                    <p className='text-justify'>Abstract</p>
                    {/* status image */}
                    <div className='flex my-3'>
                        <img width={'120px'} height={'120px'} src="https://media.istockphoto.com/id/2176343328/vector/grunge-blue-purchased-word-round-rubber-seal-stamp-on-white-background.jpg?s=612x612&w=0&k=20&c=Lb1E43jd8ZLXXGgYlSOtCsECOEsuXfKi_ohsi0tWakE=" alt="purchase" />
                        
                    </div>
                </div>
                <div className='px-4 mt-4 md:mt-0'>
                    <img className='w-full' src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg" alt="book" />
                    
                </div>

            </div>

        </div>
    </div>
  )
}

export default Purchase