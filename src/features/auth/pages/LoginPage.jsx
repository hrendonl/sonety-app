import { useState } from "react";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage({ onSubmit, isLoading, error }) {
  // const { login, isLoading, error } = useLogin();

  const handleLogin = (credentials) => {
    // login(credentials);
  };

  return (
    // Contenedor principal que centra todo
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-900">
      <LoginForm 
        onSubmit={handleLogin} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
}
