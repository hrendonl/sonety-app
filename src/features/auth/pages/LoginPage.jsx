import { useEffect, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import Alert from "../../../components/ui/Alert";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const { login, isLoading, alertMessage } = useLogin();

  useEffect(() => {
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
