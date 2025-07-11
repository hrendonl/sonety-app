import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import logo from '../../../assets/images/single_logo.png' 


export function LoginForm({ onSubmit, isLoading, error: apiError }) {
  // 2. Configurar useForm
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  // 3. 'handleSubmit' de react-hook-form se encarga de la validación
  //    antes de llamar a tu función 'onSubmit'.
  return (
    <div className="w-full h-screen p-8 space-y-6 flex flex-col justify-center bg-gray-800 md:h-auto md:max-w-md md:rounded-lg md:shadow-lg">
      <div className="text-center">
        <img className="h-10 mx-auto" src={logo} alt="Logo de Sonety" />
        <h2 className="mt-4 text-2xl font-bold text-white">
          Inicia sesión en Sonety
        </h2>
      </div>

      {/* 4. Usar el handleSubmit de la librería */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {apiError && <p className="text-sm text-center text-red-500">{apiError}</p>}
        
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder='Correo electrónico'
            autoComplete='off'
            // 5. Registrar el input y añadir reglas de validación
            {...register("email", { 
              required: "El correo electrónico es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El formato del correo no es válido"
              }
            })}
            className={`block w-full px-3 py-2 mt-1 text-white bg-gray-700 border rounded-md shadow-sm focus:outline-none sm:text-sm 
              ${errors.email 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
              }`
            }
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-300">
            Contraseña
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              // 5. El tipo del input ahora es dinámico
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              {...register("password", { required: "La contraseña es requerida" })}
              className={`block w-full px-3 py-2 text-white bg-gray-700 border rounded-md shadow-sm focus:outline-none sm:text-sm 
                pr-10 ${/* Añade padding a la derecha para el icono */''}
                ${errors.password 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                }`
              }
            />
            {/* 6. Botón para mostrar/ocultar */}
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
            >
              {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
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