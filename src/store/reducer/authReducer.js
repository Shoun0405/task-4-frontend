import { createSlice } from '@reduxjs/toolkit'
import authService from '../../services/authService'

const authTokenKey = 'AuthToken'

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        isAuthorized:false,
        account:null,
        users:[]
    },
    reducers:{
        login:(state)=>{
            state.isAuthorized = true
        },
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setIsLoginAuthToken:(state,action)=>{
            localStorage.setItem(authTokenKey,JSON.stringify(action.payload))
        }
    }
},
)


export const selectIsAuthorized = state => state.auth.isAuthorized

export const selectIsLoginAuthToken = state => JSON.parse(localStorage.getItem(authTokenKey)) || ''

export const selectAccount = state => state.auth.account;

export const selectUsers = state => state.auth.users

export const selectUserToken = state => state.auth.account?.token || ''

// ---------------------------------------------------------------------

export const registrateAsync = (firstName,lastName,email,password) => {
    
    return new Promise ((resolve,reject)=>{
        authService.registrate(firstName,lastName,email,password).then(resolve).catch(reject)
    })
}

export const loginAsync = (email,password) => async dispatch => {

    
        await authService.login(email,password).then(
            res => {
                const account = res?.data
                dispatch(authSlice.actions.setAccount(account))
                dispatch(authSlice.actions.setIsLoginAuthToken(account.token))
            }
        ).catch(e=>console.log(e))

        await authService.getAllUsers().then(
            res => {
                dispatch(authSlice.actions.setUsers(res))
            }
        )
        
        dispatch(authSlice.actions.login())
}

export const getAllUsersAsync = () => async (dispatch) => {
    
    await authService.getAllUsers(selectIsLoginAuthToken).then(
        res => {
            
            dispatch(authSlice.actions.setUsers(res.data))
        }
    )

}

export const blockUsers = (users,boolean,token) => async (dispatch) => {
    console.log(token)
      await authService.blockUsers(users,boolean,token)
      dispatch(getAllUsersAsync())
} 

export const unblockUsers = (users) => dispatch => {
    return new Promise((resolve,reject) => {
        authService.blockUsers([],users,selectIsLoginAuthToken).then(
            () => {
                resolve()
            }
        ).catch(()=>{
            reject()
        })

        dispatch(getAllUsersAsync)
    })
} 

export const deleteUsers = (users) => dispatch => {
    return new Promise((resolve,reject) => {
        authService.deleteUsers(users,selectIsLoginAuthToken).then(
            () => {
                dispatch(selectUsers)
                resolve()
            }
        ).catch(()=>{
            reject()
        })
    })
} 



export default authSlice.reducer