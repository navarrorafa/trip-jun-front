import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { auth } from "../auth/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { LogoutButton } from "../auth/components/LogoutButton";
import { DropdownAccount } from "../realestate/components/DropdownAccount";
import { UserContext } from '../context/UserContext';

export const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userStatus } = useContext(UserContext);
  const { name } = userStatus;
  const nameRegistered = JSON.parse(localStorage.getItem("saveName"));

  // Comprueba si el usuario está autenticado y en ese caso setea estado en true
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <>
      <nav className="p-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-blue-300 ${isActive ? "text-blue-500" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white hover:text-blue-300 ${isActive ? "text-blue-500" : ""
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white hover:text-blue-300 ${isActive ? "text-blue-500" : ""
                }`
              }
            >
              Contacto
            </NavLink>
            {isAuthenticated && <DropdownAccount />}
          </div>

          <div className="mt-4 md:mt-0">
            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row-reverse">
                <LogoutButton setIsAuthenticated={setIsAuthenticated} />
                {nameRegistered ?
                  <p className="text-white p-1 sm:pe-3">Hola <strong>{nameRegistered}</strong></p> :
                  <p className="text-white p-1 sm:pe-3">Hola <strong>{name}</strong></p>
                }
              </div>
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
