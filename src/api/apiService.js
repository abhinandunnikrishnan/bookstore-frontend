import axiosInstance from "./axiosInstance"
const apiService=async (httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody,
        header:reqHeader
    }
    try{
        const response =await axiosInstance(reqConfig)
        return response
    }catch(err){
        return err
    }
}
export default apiService