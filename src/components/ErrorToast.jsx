import { useStore } from "zustand";
import useWalletStore from "../store/useAuthStore";

function ErrorToast() {
  const { error, closeError } = useStore(useWalletStore);
  return (
    <div
      className={` ${
        !error && "hidden"
      } fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg flex items-center gap-2`}
    >
      <span className="text-sm">{error}</span>
      <button
        onClick={closeError}
        className="text-red-500 hover:text-red-700 font-bold text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}

export default ErrorToast;
