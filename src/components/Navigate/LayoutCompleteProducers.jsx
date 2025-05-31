import { Outlet } from "react-router-dom";
import { Sidebar } from "./SideBar";

const LayoutCompleteProducers = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[100px] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutCompleteProducers;
