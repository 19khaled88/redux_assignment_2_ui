import { async } from '@firebase/util'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import auth from '../../../config/firebase'

const initialState={
    email:'',
    role:'',
    token:'',
    isLoading:true,
    user:'',
    isError:false,
    isVerified:'',
    error:''
}

export const newUser = createAsyncThunk('auth/createUser',async({email,password})=>{
    const response = await createUserWithEmailAndPassword(auth, email, password)
    const {user} = response
    localStorage.setItem('employeeAuthToken',user.accessToken)
    return {token:user.accessToken,email:user.email,user:user.displayName,isVerified:user.emailVerified}
})

export const login = createAsyncThunk('auth/login',async({email,password})=>{
    const response = await signInWithEmailAndPassword(auth,email,password)
    const {user} = response
    localStorage.setItem('employeeAuthToken',user.accessToken)
    return {token:user.accessToken,email:user.email,user:user.displayName,isVerified:user.emailVerified}
    
})

export const loginWithGoogle =createAsyncThunk('auth/google',async()=>{
    const provider = new GoogleAuthProvider()

    // await signInWithPopup(auth,provider)
    //     .then((result)=>{
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken 
    //         const user = result.user
    //         localStorage.setItem('employeeAuthToken',token)
    //         return {token:token,email:user.email,user:user.displayName,isVerified:user.emailVerified}
    //     })  
    //     .catch((error)=>{
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         const email = error.customData.email 
    //         const credential = GoogleAuthProvider.credentialFromError(error)
    //         const authError = 'Authentication Error'
    //         return error
    //     })
    const response = await signInWithPopup(auth,provider)
   
    const {user} = response
    localStorage.setItem('employeeAuthToken',user.accessToken)
    return {token:user.accessToken,email:user.email,user:user.displayName,isVerified:user.emailVerified}
   
})

const authSlice =createSlice({
    name:'auth',
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(newUser.pending,(state)=>{
                state.isLoading = true
                state.isError = false
                state.token = null
                state.user = null
                state.error = ''
            })
            .addCase(newUser.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isError =  false
                state.email = action.payload.email
                state.token = action.payload.token
                state.user=action.payload.user
                state.error = ""
            })
            .addCase(newUser.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
                state.email = null 
                state.token = null 
                state.user = null
                state.email = ''
            })
            .addCase(login.pending,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.token = null
                state.user = null
                state.error = ''
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isError =  false
                state.email = action.payload.email
                state.token = action.payload.token
                state.user=action.payload.user
                state.error = ""
            })
            .addCase(login.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
                state.email = null 
                state.token = null 
                state.user = null
                state.email = ''
            })
            .addCase(loginWithGoogle.pending,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.token = null
                state.user = null
                state.error = ''
            })
            .addCase(loginWithGoogle.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isError =  false
                state.email = action.payload.email
                state.token = action.payload.token
                state.user=action.payload.user
                state.error = ""
            })
            .addCase(loginWithGoogle.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.error = 'Authentication Error'
                state.email = null 
                state.token = null 
                state.user = null
                state.email = ''
            })
    }
})

export default authSlice.reducer