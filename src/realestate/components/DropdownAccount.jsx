import { useState } from 'react';
import { Link } from "react-router-dom";

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
            <Link className="block px-4 py-2 hover:bg-gray-100" to="/myqueries">
              Mis consultas
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 hover:bg-gray-100" to="/editpass">
              Editar contraseña
            </Link>
          </li>
          <li className="border-t border-gray-200"></li>
          <li>
            <Link className="block px-4 py-2 hover-bg-gray-100" to="/delete">
              Borrar cuenta
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}