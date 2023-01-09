import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import auth from '../../../config/firebase'

const initialState={
    email:'',
    role:'',
    isLoading:true,
    isError:false,
    error:''
}

const newUser = createAsyncThunk('auth/createUser',async({email,password})=>{
    const data = await createUserWithEmailAndPassword(auth, email, password)
})

const authSlice =createSlice({
    name:'auth',
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(newUser.pending,(state)=>{
                state.isLoading = true
                state.isError = false
                state.error = ''
            })
            .addCase(newUser.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isError =  false
                state.email = action.payload
                state.error = ""
            })
            .addCase(newUser.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.error = action.payload
                state.email = ''

            })
    }
})

export default authSlice.reducer