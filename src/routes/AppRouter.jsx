import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthRouter } from "./AuthRouter";
import { RealestateRouter } from "./RealestateRouter";
import { ContactPage, AboutUsPage } from "../realestate/pages/index";
// Importacion de herramientas de autenticacion de Firebase
import { auth } from "../auth/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Comprueba si el usuario está autenticado y cambia el estado según el caso
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
      }
    });
  }, []);

  return (
    <>
      {/* <HeaderComp /> */}
     
        
      <div className="bg-stone-300 min-h-screen">
      <Routes>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        {!isAuthenticated ? (
          <Route path="/*" element={<AuthRouter />}></Route>
        ) : (
          <Route path="/*" element={<RealestateRouter />}></Route>
        )}
      </Routes>

      </div>

     
    </>
  );
};
