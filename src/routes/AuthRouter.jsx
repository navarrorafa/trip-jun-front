import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../auth/pages/index";
export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
