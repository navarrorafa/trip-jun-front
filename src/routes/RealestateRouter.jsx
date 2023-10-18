import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../realestate/pages/index";

export const RealestateRouter = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>     
    </>
  );
};
