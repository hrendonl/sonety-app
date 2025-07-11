import { useEffect, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import Alert from "../../../components/ui/Alert";

export default function LoginPage({ onSubmit, isLoading, error }) {
  // const { login, isLoading, error } = useLogin();

  const handleLogin = (credentials) => {
    // login(credentials);
  };

  useEffect(() => {
    document.title = 'Iniciar Sesión - Sonety';
  }, []);

  return (
    // Contenedor principal que centra todo
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-900">
      <Alert message="Correo o contraseña incorrectos"/>
      <LoginForm 
        onSubmit={handleLogin} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
}
