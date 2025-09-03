import axios from '../../config/axiosConfig';

export const signUpRequest = async ({email,password,userName}) =>{
    try {
        const response= await axios.post("/users/signup",{
            email,
            password,
            userName
        });

        return response?.data;
    } catch (error) {
      console.error(error);
       throw error.message;
    }
}

export const signInRequest= async ({email, password})=>{
    try {
         const response= await axios.post("/users/signin",{
            email,
            password,
        });

        return response?.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}