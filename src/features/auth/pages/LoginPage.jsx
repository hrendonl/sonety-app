import { useContext, useEffect, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import Alert from "../../../components/ui/Alert";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppProvider";

export default function LoginPage() {
  const {token } = useContext(AppContext)
  const { login, isLoading, alertMessage } = useLogin();

  const navigate = useNavigate()

  useEffect(() => {
    if (token) navigate('/groups/pacto-cartagena/songs')
    document.title = 'Iniciar Sesión - Sonety';
  }, []);

  return (
    // Contenedor principal que centra todo
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-900">
      {alertMessage && <Alert message={alertMessage}/>}
      <LoginForm 
        onSubmit={login} 
        isLoading={isLoading}
      />
    </div>
  );
}
