import apiService from "../api/apiService";

// register: auth component when click register button
export const registerAPI = async(userData)=>{
    return await apiService("POST","/register",userData)
}

// login: auth component when click login button
export const loginAPI = async(userData)=>{
    return await apiService("POST","/login",userData)
}

// google login api -auth component when clicking  on google login button
export const googleLoginAPI = async(userData)=>{
    return await apiService("POST","/google-login",userData)
}

// edit user api -edit component when clicking  on edit  button
export const userUpdateAPI = async(userId,userData)=>{
    return await apiService("PUT",`/user/${userId}`,userData)
}

// add book api -uploadBook component when clicking  on add  button
export const addBookApi = async(bookDetails)=>{
    return await apiService("POST",`/book`,bookDetails)
}

// get home book api -home component when page loads
export const getHomeBooksApi = async()=>{
    return await apiService("GET",`/home-books`,{})
}

// get all book api -book component when page loads
export const getAllBooksApi = async(searchKey)=>{
    return await apiService("GET",`/all-books?search=${searchKey}`,{})
}

// get user book api -bookStatus component when it opens
export const getUserBooksApi = async()=>{
    return await apiService("GET",`/user-books`,{})
}

// get user brought book api -purchase component when it opens
export const getUserBroughtBooksApi = async()=>{
    return await apiService("GET",`/brought-books`,{})
}

// delete user uploaded book api -bookStatus component when clickes on delete button
export const deleteUserBooksApi = async(bookId)=>{
    return await apiService("DELETE",`/book/${bookId}`,{})
}

// view-book/:id
export const viewBookApi = async(id)=>{
    return await apiService("GET",`/view-book/${id}`,{}) 
}

// buy book
export const buyBookApi = async(id)=>{
    return await apiService("PUT",`/books/${id}/buy`,{}) 
}



// edit admin api -admin settings component when clicking  on edit  button
export const adminUpdateAPI = async(adminId,adminData)=>{
    return await apiService("PUT",`/admin/${adminId}`,adminData)
}

// get all user api -admin resource component 
export const userListAPI = async()=>{
    return await apiService("GET",`/user-list`,{})
}

// get all book api -admin resource component 
export const bookListAPI = async()=>{
    return await apiService("GET",`/book-list`,{})
}

// update book status api -admin resource component 
export const editBookStatusAPI = async(id)=>{
    return await apiService("PUT",`/book/${id}`,{})
}

// get book details from ai
export const getBookDetailsAIAPI = async(title)=>{
    return await apiService("POST",`/book-ai`,{title})
}