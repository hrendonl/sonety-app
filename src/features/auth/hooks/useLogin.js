import { useContext, useState } from "react";
import { loginApi } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppProvider";

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false)
    const [alertMessage, setAlertMessage] = useState(null)
    const navigate = useNavigate()
    const {setApp, groupSelected } = useContext(AppContext)

    const login = async (credentials) =>{
        setIsLoading(true)
        setAlertMessage(null)
        try {
            const data = await loginApi(credentials)
            setApp('SET_TOKEN', data.token)
            setApp('SET_USER', data.user)
            navigate(`/groups/${groupSelected.name.replaceAll(" ", "-")}/songs`)
            
        } catch (err) {
            setAlertMessage('El correo o la contraseña son incorrectos')
        } finally {
            setIsLoading(false)
        }
    }

  return { login, isLoading, alertMessage };
}
