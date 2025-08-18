import { useEffect, useState } from "react";
import { MdErrorOutline, MdCheckCircleOutline } from 'react-icons/md';

export default function Alert({ message, type = "error", duration = 3000 }) {
   const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const baseClasses = `
    fixed top-5 left-1/2 -translate-x-1/2 
    w-11/12 sm:w-auto sm:max-w-md 
    p-4 rounded-md shadow-lg 
    transition-opacity duration-300 z-50 
    flex items-center
  `;
  
  const visibilityClasses = visible ? "opacity-100" : "opacity-0";

  const alertConfig = {
    error: {
      icon: <MdErrorOutline className="h-6 w-6 mr-3 flex-shrink-0" />,
      classes: "bg-red-500 text-white",
    },
    success: {
      icon: <MdCheckCircleOutline className="h-6 w-6 mr-3 flex-shrink-0" />,
      classes: "bg-green-500 text-white",
    },
  };
  
  const config = alertConfig[type];

  if (!message) return null;

  return (
    <div className={`${baseClasses} ${config.classes} ${visibilityClasses}`}>
      {config.icon}
      <span>{message}</span>
    </div>
  );
}
