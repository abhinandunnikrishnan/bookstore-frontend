import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaUserAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { googleLoginAPI, loginAPI, registerAPI } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { routeContext } from '../contextAPI/RouteGuard'

function Auth({insideRegister}) {
  const{role,setRole,authorisedUser,setAuthorisedUser} = useContext(routeContext)
  const navigate=useNavigate()
  const [togglePassword,setTogglePassword]=useState(false)

  const formik=useFormik({
    initialValues:{
      username:"Username",
      email:"",
      password:"",
    },
    validationSchema:Yup.object({
      username:Yup.string().min(3,"must be at least 3 characters").required("required"),
      email:Yup.string().email("invalid email").required("required"),
      password:Yup.string().required("required")
    }),
    onSubmit:(values,{resetForm})=>{
      console.log(values);
      if(insideRegister){
        console.log("register api call");
        handleRegister(values) 
      }else{
        console.log("login api call");
        handleLogin(values)
      }
      resetForm() 
    }
  })

  const handleLogin=async(userData)=>{
    const result=await loginAPI(userData)
    console.log(result);
    if(result.status==200){
      toast.success("successfully logged in!!")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      setAuthorisedUser(true)
      setTimeout(() => {
        if(result.data.user.role=="admin"){
          setRole("admin")
          navigate("/admin")
        }else{
          setRole("user")
          navigate("/")
        }
      }, 2500);
    }else{
      toast.error(result)
    }
    
  }

  const handleRegister= async(userData)=>{
    const result= await registerAPI(userData)
    console.log(result);
    if(result.staus==201){
      toast.success("Successfully Registered.. Please Login")
    }else{
      toast.error(result)
    }
    navigate("/login")
  }

  const handleGoogleLogin=async (credentialResponse)=>{
    console.log("inside google login");
    const {email,name,picture} =jwtDecode(credentialResponse.credential)
    console.log(email,name,picture);
    // api call
    const result=await googleLoginAPI({username:name,email,password:"googlePassword,picture"})
    if(result.status==200){
      toast.success("Login succcessfull")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify( result.data.user))
      setAuthorisedUser(true)
      setTimeout(()=>{
        if(result.data.user.role=="admin"){
          setRole("admin")
          navigate('/admin')
        }else{
          setRole("user")
          navigate("/")
        }
      },2500)
    }
    
    
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[url(/login1.png)] bg-cover bg-center text-blue-900'>
      <div className='p-10'>
        <h3 className='text-center font-bold text-3xl'>BOOKSTORE</h3>
        <div style={{width:'400px'}} className='bg-blue-900 text-white p-5 flex justify-center items-center flex-col my-5 rounded-xl shadow'>
          <div style={{width:'80px',height:'80px',borderRadius:'50%'}} className='border mb-5 flex justify-center items-center'>
            <FaUserAlt  className='text-3xl'/>
          </div>
          <h1 className='3xl'>{insideRegister ? "Register": "Login"}</h1>
          <form onSubmit={formik.handleSubmit} className='my-5 w-full'>

            {/* username */}
            {
              insideRegister &&
              <>
                <input name='username' value={formik.values.username} onChange={formik.handleChange} className='bg-white p-2 w-full rounded my-5 text-blue-500' type="text" placeholder='Username' />
                <div className='mb-5 text-yellow-400'>{formik.errors.username}</div>
              </>
            }

            {/* email */}
            <input name='email' value={formik.values.email} onChange={formik.handleChange} className='bg-white p-2 w-full rounded my-5 text-blue-500' type="email" placeholder='email' />
            <div className='mb-5 text-yellow-400'>{formik.errors.email}</div>

            {/* password */}
            <div className='flex items-center'>
              <input name='password' value={formik.values.password} onChange={formik.handleChange} className='bg-white p-2 w-full rounded my-5 text-blue-500' type={togglePassword?"text":"password"} placeholder='password' /> 
              {
                togglePassword?
                <FaEyeSlash onClick={()=>setTogglePassword(!togglePassword)}  className='text-gray-400 cursor-pointer' style={{marginTop:'-2px',marginLeft:'-30px'}}/>
                :
              <FaEye onClick={()=>setTogglePassword(!togglePassword)} className='text-gray-400 cursor-pointer' style={{marginTop:'-2px',marginLeft:'-30px'}}/>
              }
              
            </div>
            <div className='mb-5 text-yellow-400'>{formik.errors.password}</div>

            {/* forgot password */}
            <div className='flex justify-between mb-5'>
              <p className='text-xs text-orange-300'>*Never Share your Password</p>
              {
                !insideRegister &&
                <button className='text-xs underline'>Forgot Password</button>
              }
            </div>
            {/* login/register button */}
            <div className='text-center'>
              {
                insideRegister ?
                <button type='submit' className='bg-green-600 p-2 w-full rounded'>Rgister</button>
                :
                <button type='submit' className='bg-green-600 p-2 w-full rounded'>Login</button>
              }
            </div>
            {/* google login */}
            {
              !insideRegister &&
              <div className='my-5 text-center'>
                <p>------------------or------------------</p>
                <div className='mt-2 flex justify-center items-center w-full'>
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>
              </div>
            }
            {/* new/already user */}
            <div className='text-center my-5'>
              {
                insideRegister ?
                <p > Existing User ? <Link to={'/login'} className='underline text-blue-300'>Login</Link></p>
                :
                <p > New User ? <Link to={'/register'} className='underline text-blue-300'>Register</Link></p>
              }
            </div>
          </form>
        </div>
      </div>
      {/* toast container */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
  )
}

export default Auth