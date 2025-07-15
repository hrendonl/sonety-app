import { useContext, useState } from "react";
import { loginApi } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppProvider";

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const {setApp } = useContext(AppContext)

    const login = async (credentials) =>{
        setIsLoading(true)
        setError(null)
        try {
            const data = await loginApi(credentials)
            setApp('SET_TOKEN', data.token)
            setApp('SET_USER', data.user)
            navigate('/')
            
        } catch (err) {
            setError('El correo o la contraseña son incorrectos')
        } finally {
            setIsLoading(false)
        }
    }

  return { login, isLoading, error };
}
