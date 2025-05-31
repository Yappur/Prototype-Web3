import { create } from "zustand";
import { metamaskConnection } from "../utils/metamaskConnection";
import { showSuccessToast } from "../components/Modals/CustomToast";

const useWalletStore = create((set, get) => ({
  provider: undefined,
  signer: undefined,
  address: undefined,
  shortAddress: undefined,

  ensName: null,

  isConnected: false,
  isLoading: false,
  error: null,
  setError: (error) => {
    set({ error });
    if (error) {
      setTimeout(() => set({ error: null }), 3000);
    }
  },

  closeError: () => set({ error: null }),

  connectWallet: async () => {
    set({ isLoading: true });
    try {
      const { provider, signer, address, ensName } = await metamaskConnection();
      set({
        provider,
        signer,
        address,
        ensName,
        isLoading: false,
        isConnected: true,
        shortAddress: `${address?.slice(0, 8)}...${address?.slice(-8)}`,
      });
      showSuccessToast("¡Wallet conectada exitosamente!");
    } catch (error) {
      get().setError(error.message);
      set({ isLoading: false });
    }
  },
  disconnectWallet: () => {
    set({
      provider: undefined,
      signer: undefined,
      address: undefined,
      shortAddress: undefined,
      isConnected: false,
    });
  },
  getDisplayName: () => {
    const { ensName, shortAddress, address } = get();
    return ensName || shortAddress || address || "Sin conectar";
  },
}));

export default useWalletStore;
