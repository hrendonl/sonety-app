import { useState } from 'react';
import logo from '../../../assets/images/single_logo.png' 


export function LoginForm({ onSubmit, isLoading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="w-full h-screen  p-8 space-y-6 flex flex-col justify-center bg-gray-800 md:h-auto md:max-w-md md:rounded-lg md:shadow-lg">
      <div className="text-center">
        {/* <Logo /> */}
        <img className="h-10 mx-auto" src={logo} alt="" />
        <h2 className="mt-4 text-2xl font-bold text-white">
          Inicia sesión en Sonety
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-sm text-center text-red-500">{error}</p>}
        
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder='Correo electronico'
            autoComplete='off'
            required
            className="block w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-300">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            required
            className="block w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 font-medium text-white bg-[#0d73ec] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 disabled:bg-blue-400"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

      </form>

      <div className="text-sm text-center">
        <a href="#" className="font-medium text-gray-400 hover:text-gray-200">
          ¿Has olvidado tu contraseña?
        </a>
      </div>
      <div className="text-sm text-center text-gray-400">
        ¿No tienes cuenta?{' '}
        <a href="#" className="font-medium text-blue-400 hover:underline">
          Regístrate
        </a>
      </div>
    </div>
  );
}