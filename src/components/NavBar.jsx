import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../auth/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { LogoutButton } from "../auth/components/LogoutButton";

export const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Comprueba si el usuario está autenticado y en ese caso setea estado en true
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
      }
    });
  }, []);

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-blue-300 ${
                  isActive ? "text-blue-500" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white hover:text-blue-300 ${
                  isActive ? "text-blue-500" : ""
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white hover:text-blue-300 ${
                  isActive ? "text-blue-500" : ""
                }`
              }
            >
              Contacto
            </NavLink>
          </div>

          <div className="mt-4 md:mt-0">
            {isAuthenticated ? (
              <> 
              <p>Saludos {user.displayName}</p>
              <LogoutButton setIsAuthenticated={setIsAuthenticated} />
              </>
            ) : (
              <Link to="/login">
                <button
                  type="button"
                  className="px-4 py-1 text-sm text-white bg-green-500 rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg"
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
