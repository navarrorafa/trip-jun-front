import React, { useState } from 'react'

export const DropdownAccount = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const closeDropdown = () => {
        setIsOpen(false);
      };

    return (
    <div className="relative group" onMouseLeave={closeDropdown}>
      <button
        className={`text-white hover:text-blue-300 focus:outline-none ${isOpen ? 'hidden' : ''}`}
        onClick={toggleDropdown}
      >
        Account
      </button>
      {isOpen && (
        <ul className="absolute text-gray-800 bg-white border border-gray-200 mt-2 space-y-1 z-10 rounded-md" onMouseEnter={() => setIsOpen(true)}>
          <li>
            <a className="block px-4 py-2 hover:bg-gray-100" href="">
              Mis consultas
            </a>
          </li>
          <li>
            <a className="block px-4 py-2 hover:bg-gray-100" href="">
              Editar email
            </a>
          </li>
          <li>
            <a className="block px-4 py-2 hover:bg-gray-100" href="">
              Editar contraseña
            </a>
          </li>
          <li className="border-t border-gray-200"></li>
          <li>
            <a className="block px-4 py-2 hover-bg-gray-100" href="">
              Borrar cuenta
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}