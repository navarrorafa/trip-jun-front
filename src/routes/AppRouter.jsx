import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthRouter } from "./AuthRouter";
import { RealestateRouter } from "./RealestateRouter";
import { ContactPage, AboutUsPage, DeleteAccPage, EditPassPage, MyQueriesPage } from "../realestate/pages/index";
import { auth } from "../auth/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../context/UserContext";


export const AppRouter = () => {
  const { setUserStatus } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Comprueba si el usuario está autenticado y en ese caso setea estado en true
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserStatus({ uid: user.uid, name: user.displayName })
      } else {
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  return (
    <>
      <Routes>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/editpass" element={<EditPassPage />} />
        <Route path="/delete" element={<DeleteAccPage />} />
        {!isAuthenticated ? (
          <Route path="/*" element={<AuthRouter />}></Route>
        ) : (
          <Route path="/*" element={<RealestateRouter />}></Route>
        )}
      </Routes>
    </>
  );
};
