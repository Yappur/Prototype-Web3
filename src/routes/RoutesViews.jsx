import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import ViewProducers from "../pages/ViewProducers";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Producers" element={<ViewProducers />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
