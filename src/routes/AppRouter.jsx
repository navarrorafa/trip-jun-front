import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthRouter } from "./AuthRouter";
import { RealestateRouter } from "./RealestateRouter";

//get login status from firebase:
//import { auth } from "../config/firebaseConfig";
//import { onAuthStateChanged } from "firebase/auth";

export const AppRouter = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticated = false;
  //check if user is logged and if so, set isAuthenticated to "true"
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       setIsAuthenticated(true);
  //     }
  //   });
  // }, []);

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="/*" element={<AuthRouter />}></Route>
      ) : (
        <Route path="/*" element={<RealestateRouter />}></Route>
      )}
    </Routes>
  );
};
