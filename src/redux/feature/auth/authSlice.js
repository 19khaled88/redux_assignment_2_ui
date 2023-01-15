import { useDispatch } from 'react-redux'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import auth from '../../../config/firebase'

const initialState={
    email:'',
    role:'',
    token:'',
    isLoading:true,
    user:'',
    success:'',
    isSuccess:'',
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
    const response = await signInWithPopup(auth,provider)
    const {user} = response
    localStorage.setItem('employeeAuthToken',user.accessToken)
    return {token:user.accessToken,email:user.email,user:user.displayName,isVerified:user.emailVerified}
   
})

const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
        setuser:(state,action)=>{
            state.email = action.payload;
            state.isLoading = false;
        },
        logout:(state,action)=>{
            state.email=null;
            state.role=null;
            state.token=null;
            state.isLoading=true;
            state.user=null;
            state.success=null;
            state.isSuccess=null;
            state.isError=false;
            state.isVerified=null;
            state.error=null;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(newUser.pending,(state)=>{
                state.isLoading = true
                state.isError = false
                state.token = null
                state.user = null
                state.error = ''
                state.success=null
                state.isSuccess=null
            })
            .addCase(newUser.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isError =  false
                state.email = action.payload.email
                state.token = action.payload.token
                state.user=action.payload.user
                state.success='Registration Successful'
                state.isSuccess=true
                state.error = ""
            })
            .addCase(newUser.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
                state.email = null 
                state.token = null 
                state.user = null
                state.success=null
                state.isSuccess=false
                state.email = ''
            })
            .addCase(login.pending,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.token = null
                state.user = null
                state.success=null
                state.isSuccess=null
                state.error = ''
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isError =  false
                state.email = action.payload.email
                state.token = action.payload.token
                state.user=action.payload.user
                state.success='Login Successful'
                state.isSuccess=true
                state.error = ""
            })
            .addCase(login.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
                state.email = null 
                state.token = null 
                state.user = null
                state.success=null
                state.isSuccess=false
                state.email = ''
            })
            .addCase(loginWithGoogle.pending,(state,action)=>{
                state.isLoading = true
                state.isError = false
                state.token = null
                state.user = null
                state.success=null
                state.isSuccess=null
                state.error = ''
            })
            .addCase(loginWithGoogle.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isError =  false
                state.email = action.payload.email
                state.token = action.payload.token
                state.user=action.payload.user
                state.success='Google login Successful'
                state.isSuccess=true
                state.error = ""
            })
            .addCase(loginWithGoogle.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.error = 'Authentication Error'
                state.email = null 
                state.token = null 
                state.success=null
                state.isSuccess=false
                state.user = null
                state.email = ''
            })
    }
})

export const {setuser,logout} = authSlice.actions;
export default authSlice.reducer