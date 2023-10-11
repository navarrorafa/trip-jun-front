import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, ContactPage } from "../realestate/pages/index";

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
