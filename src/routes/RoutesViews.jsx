import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import ViewProducers from "../pages/ViewProducers";
import AnotherHomePage from "../pages/AnotherHomePage";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Producers" element={<ViewProducers />} />
        <Route path="/another-home" element={<AnotherHomePage />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
