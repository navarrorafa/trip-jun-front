import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RecoverPage, RegisterPage, StartPage } from "../auth/pages/index";
export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recover" element={<RecoverPage />} />
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
