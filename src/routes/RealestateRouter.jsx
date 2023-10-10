import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../realestate/pages";

// import { HeaderComp } from "../ui/HeaderComp";
// import { FooterComp } from "../ui/FooterComp";

export const RealestateRouter = () => {
  return (
    <>
      {/* <HeaderComp /> */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      </main>
      {/* <FooterComp /> */}
    </>
  );
};
