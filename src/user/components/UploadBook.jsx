import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import { addBookApi, getBookDetailsAIAPI } from '../../services/allApi';
import useDebounce from '../../hooks/useDebounce';


function UploadBook() {
    const [bookDetails,setBookDetails]=useState({
        title:"",author:"",imageUrl:"",pages:"",price:"",discountedPrice:"",abstract:"",publisher:"",isbn:"",language:"",category:"",uploadImages:[]
    })

    const [preview,setPreview]=useState("")
    const [previewList,setPreviewList]=useState([])
    const debounceTitleSearch =useDebounce(bookDetails.title,2000)
    // console.log(bookDetails);

    useEffect(()=>{
        console.log(debounceTitleSearch);
        
        if(debounceTitleSearch){
            console.log("Gemini API call");
            generateBookAbstractAI()
            
        }
    },[debounceTitleSearch])

    const generateBookAbstractAI = async()=>{
        // console.log(debounceTitleSearch);

        try{
            const result = await getBookDetailsAIAPI(debounceTitleSearch)
            console.log("api response:",result.data);
            if(result.data?.content){
                setBookDetails({...bookDetails,
                    abstract:result.data.content.abstract,
                    isbn:result.data.content.isbn,
                    author:result.data.content.author,
                    publisher:result.data.content.publisher,
                    language:result.data.content.language,
                    category:result.data.content.category,
                    imageUrl:result.data.content.book_cover_image_url
                })
            }else{
                console.error("abstract not found in api response", result.data)
            }
            
            }catch(error){
                console.error("error generating book abstract :",error.response?.data ||error.message);
                
            }
        
    }

    const handleUploadImages=(e)=>{
        const imageFile=e.target.files[0]
        const uploadedImageArray=bookDetails.uploadImages
        uploadedImageArray.push(imageFile)
        setBookDetails({...bookDetails,uploadImages:uploadedImageArray})
        const url =URL.createObjectURL(imageFile)
        setPreview(url)
        const demoPreviewList=previewList
        demoPreviewList.push(url)
        setPreviewList(demoPreviewList)
    }

    const resetForm=()=>{
        setBookDetails({title:"",author:"",imageUrl:"",pages:"",price:"",discountedPrice:"",abstract:"",publisher:"",isbn:"",language:"",category:"",uploadImages:[]})
        setPreviewList([])
        setPreview("")
    }

    const handleAddBook = async()=>{
        const{title,author,imageUrl,pages,price,discountedPrice,abstract,publisher,isbn,language,category,uploadImages}=bookDetails
        if(!title || !author || !imageUrl || !pages || !price || !discountedPrice || !abstract || !publisher || !isbn ||  !language || !category || uploadImages.length==0 ){
            toast.info("please fill the form completely")
        }else{
            // api call
            const reqBody=new FormData()
            for(let key in bookDetails){
                if(key!="uploadImages"){
                    reqBody.append(key,bookDetails[key])
                }else{
                    bookDetails.uploadImages.forEach(imageFile=>{
                        reqBody.append("uploadImages",imageFile)
                    })
                }
            }
            const result= await addBookApi(reqBody)
            // console.log(result);
            if(result.status==201){
                toast.success("book added successfully")
            }else{
                toast.warning(result)
            }
            resetForm()
            
        }
    }
    
  return (
    <div className='p-10 my-20 mx-5 bg-blue-100'>
        <h1 className='text-center text-3xl font-medium'>Upload Book Details</h1>
        <div className='md:grid grid-cols-2 mt-10 w-full'>
            <div className='px-3'>
                <div className='mb-3'>
                    <input value={bookDetails.title} onChange={e=>setBookDetails({...bookDetails,title:e.target.value})} type="text" placeholder='Book Title' className='w-full p-2 rounded bg-white'/>
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.author} onChange={e=>setBookDetails({...bookDetails,author:e.target.value})} type="text" placeholder='Author' className='w-full p-2 rounded bg-white'/>
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.imageUrl} onChange={e=>setBookDetails({...bookDetails,imageUrl:e.target.value})} type="text" placeholder='Book Cover image url' className='w-full p-2 rounded bg-white'/>
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.pages} onChange={e=>setBookDetails({...bookDetails,pages:e.target.value})} type="text" placeholder=' Total Pages' className='w-full p-2 rounded bg-white'/>
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.price} onChange={e=>setBookDetails({...bookDetails,price:e.target.value})} type="text" placeholder='Original price' className='w-full p-2 rounded bg-white'/>
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.discountedPrice} onChange={e=>setBookDetails({...bookDetails,discountedPrice:e.target.value})} type="text" placeholder='Discount price' className='w-full p-2 rounded bg-white'/>
                </div>
                <div className='mb-3'>
                    <textarea value={bookDetails.abstract} onChange={e=>setBookDetails({...bookDetails,abstract:e.target.value})} type="text" rows={5} placeholder='Abstract' className='w-full p-2 rounded bg-white'/>
                </div>
            </div>
            <div className='px-3'>
                <div className='mb-3'>
                    <input value={bookDetails.publisher} onChange={e=>setBookDetails({...bookDetails,publisher:e.target.value})} type="text" placeholder='Publisher' className='w-full p-2 rounded bg-white'/>
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.isbn} onChange={e=>setBookDetails({...bookDetails,isbn:e.target.value})} type="text" placeholder='ISBN' className='w-full p-2 rounded bg-white'/>
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.language} onChange={e=>setBookDetails({...bookDetails,language:e.target.value})} type="text" placeholder='Language' className='w-full p-2 rounded bg-white'/>
                </div>
                <div className='mb-3'>
                    <input value={bookDetails.category} onChange={e=>setBookDetails({...bookDetails,category:e.target.value})} type="text" placeholder='Category' className='w-full p-2 rounded bg-white'/>
                </div>
                {/* upload book image */}
                <div className='mb-3 flex justify-center items-center mt-10'>
                    <label htmlFor="bookImage">
                        <input onChange={e=>handleUploadImages(e)} type="file" id='bookImage' hidden />
                        <img width={'200px'} height={'200px'} src={preview ? preview:"https://www.pngall.com/wp-content/uploads/2/Upload-Transparent.png"} alt="user" />
                        
                    </label>
                </div>
                {/* preview of uplaoded books */}
                {
                    preview &&
                    <div className='flex justify-center items-center'>
                        {
                            previewList?.map((imageUrl,index)=>(
                                <img key={`${imageUrl}-${index}`} width={'70px'} height={'70px'} className='mx-2' src={imageUrl} alt="book image" />
                            ))
                        }
                        {
                            previewList.length<3 &&
                            <label htmlFor="bookUpload">
                                <input onChange={e=>handleUploadImages(e)} type="file" id='bookUpload' hidden />
                                <FaPlus className='text-3xl,ms-2'/>
                            </label>
                        }
                    </div>
                }
            </div>
        </div>
        <div className='flex md:justify-end justify-center w-full p-5 mt-5'>
            <button onClick={resetForm} className='bg-blue-500 text-white p-2 rounded me-5'>Reset</button>
            <button onClick={handleAddBook} className='bg-green-700 text-white p-2 rounded'>Add Book</button>
        </div>
        {/* toast container */}
        <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
  )
}

export default UploadBook