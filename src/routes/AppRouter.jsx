import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthRouter } from "./AuthRouter";
import { RealestateRouter } from "./RealestateRouter";
import { ContactPage, AboutUsPage } from "../realestate/pages/index";
import { auth } from "../auth/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { UserContext } from "../context/UserContext";

export const AppRouter = () => {
  const { userStatus } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Comprueba si el usuario está autenticado y en ese caso setea estado en true
  useEffect(() => {
    console.log("in app router");
    onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, [auth, userStatus]);

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
