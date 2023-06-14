import axiosInstance from "./axiosInstance";


class AuthService{

    registrate(firstName,lastName,email,password){
        return axiosInstance.post('/register',{
            firstName,
            lastName,
            email,
            password
        })
    }

    login(email, password) {
        return axiosInstance.post('/login', {
            email: email,
            password: password
        });
    }

    blockUsers(blockOrUnblockUsers,blockOrUnblock,token) {
        console.log(blockOrUnblockUsers)
        console.log(blockOrUnblock)
        console.log(token)
        axiosInstance.post('/change-statuses/', {
            blockOrUnblockUsers:blockOrUnblockUsers,
            blockOrUnblock:blockOrUnblock
        },
        {
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
    }

    deleteUsers(deletedUsers,token){
        return axiosInstance.post('/deletes',{
            deleteUsers:deletedUsers
        },
        {
            headers:{
                'Authorization':token
            }
        })
    }

    getAllUsers(token){
        return axiosInstance.get('/allUsers',
        {
            headers:{
                'Authorization':token
            }
        })
    }


}

const authService = new AuthService()

export default authService