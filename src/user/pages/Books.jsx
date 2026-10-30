import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getAllBooksApi } from '../../services/allApi'
import { searchContext } from '../../contextAPI/ShareContext'

function Books() {
  const {searchKey,setSearchKey}=useContext(searchContext)
  
  const[toggle,setToggle]=useState(false)
  const [token,setToken]=useState("")
  const [allBooks,setAllBooks]=useState([])
  const [categoryList,setCategoryList]=useState([])
  const[dummyAllBooks,setDummyAllBooks]=useState([])
  console.log(categoryList);
  

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const userToken = sessionStorage.getItem("token")
      setToken(userToken)
      getBooks()
    }
  },[searchKey])

  const getBooks=async()=>{
    const result = await getAllBooksApi(searchKey)
    if(result.status==200){
      setAllBooks(result.data)
      setDummyAllBooks(result.data)
      const tempCategory=result.data.map(item=>item.category)
      setCategoryList([...new Set(tempCategory)])
      
    }
  }

  const filterBooks=(category)=>{
    if(category!='all'){
      setAllBooks(dummyAllBooks?.filter(book=>book.category==category))
    }else{
      getBooks()
    }
  }

  return (
    <>
      <Header/>
      {
        token?
        <>
        <div className='flex flex-col justify-center items-center my-5'>
          <h1 className='text-3xl font-bold my-5'>All Books</h1>
          <div className='flex my-5'>
            <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="text" className='p-2 border border-gray-200 w-100 rounded' placeholder='Search by Book Title' />
            <button className='p-2 bg-blue-800 text-white ms-1'>Search</button>
          </div>
        </div>
        {/* grid filter &book card */}
        <div className='md:grid grid-cols-4 p-5 md:px-40 mb-10'>
          {/* filter */}
          <div className='col-span-1'>
            <div className='flex justify-between'>
              <h1>Filter</h1>
              <button onClick={()=>setToggle(!toggle)} className='font-bold text-2xl md:hidden'><FaBars/></button>
            </div>
            {/* filter category */}
            <div className={toggle?"block":"hidden md:block"}>
              <div className='mt-3'>
                <input onClick={()=>filterBooks('all')} type="radio" name='filter' id='no-filter' />
                <label htmlFor="no-filter" className='ms-3'>All</label>
              </div>
              {/* duplicate filter category */}
              {
                categoryList?.map(category=>(
                  <div key={category} className='mt-3'>
                    <input onClick={()=>filterBooks(category)} type="radio" name='filter' id={category} />
                    <label htmlFor={category} className='ms-3'>{category}</label>
                  </div>
                ))
              }
            </div>
          </div>
          {/* book card */}
          <div className='col-span-3'>
            <div className='md:grid grid-cols-4 md:my-0'>
          {/* duplicating card */}
          {
            allBooks.length>0 ?
            allBooks?.map(book=>(
              <div key={book?._id} className='shadow rounded p-3 m-4 md:my-0'>
                <img width={'100%'} height={'300px'} src={book?.imageUrl} alt="book" />
                <div className='flex flex-col justify-center items-center mt-4'>
                  <h2 className='text-blue-600 font-bold text-xl'>{book?.author}</h2>
                  <h3 className='text-lg'>{book?.title}</h3>
                  <Link to={`/books/${book?._id}`} className='font-bold bg-blue-500 p-2 text-white mt-2'> View Book</Link>
              </div>
          </div>
            ))
            :
            <div className='text-center font-bold my-5'>Book Not Found</div>
          }
        </div>

          </div>
        </div>
      </>
      :
      <div className='min-h-screen flex justify-center items-center flex-col'>
        <img className='w-100' src="https://www.chainreaction.ae/wp-content/themes/chainreaction_new2021/assets/404.gif" alt="pnf" />
        <p>Oh No!</p>
        <h3 className='text-2xl font-medium'>Acces only to Logined User</h3>
        <Link to={'/login'} className='bg-black mt-5 px-3 py-2 text-white'>Please Login...</Link>
      </div>
      }
    </>
  )
}

export default Books