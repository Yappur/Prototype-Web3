import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { useStore } from "zustand";
import useWalletStore from "../../store/useAuthStore";

const LayoutCompleteProducers = () => {
  const { isConnected, setError } = useStore(useWalletStore);

  if (!isConnected) {
    setError("Por favor, conecte su wallet de MetaMask para acceder");
    return <Navigate to={"/"} />;
  }
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
