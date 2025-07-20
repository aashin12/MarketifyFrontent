import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/users/register`,reqBody)
}

//login api
export const LoginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/users/login`,reqBody)
}

//Google login api
export const googleLoginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/users/google-login`,reqBody)
}

//backend data api's
export const adminEditapi = async(formData,editId)=>{
    return await commonApi("PUT", `${serverUrl}/products/${editId}`, formData)
}

export const adminAddapi = async(formData)=>{
    return await commonApi("POST", `${serverUrl}/products`, formData)
}

export const adminGetapi = async()=>{
    return await commonApi("GET", `${serverUrl}/products`)
}

export const adminDeleteApi = async(id)=>{
    return await commonApi("DELETE", `${serverUrl}/products/${id}`)
}

export const adminGetSingleApi = async (id) => {
  return await commonApi('GET', `${serverUrl}/api/products/${id}`);
};