import { Routes, Route } from "react-router-dom";
import Home from "../pages/homePage";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
