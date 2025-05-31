import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import useWalletStore from "../../store/useAuthStore";

const CustomToast = () => {
  const { error, closeError } = useWalletStore();

  useEffect(() => {
    if (error) {
      showErrorToast(error);
      setTimeout(() => {
        closeError();
      }, 100);
    }
  }, [error, closeError]);

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        className: "",
        duration: 4000,
        style: {
          background: "#1a1a1a",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "400",
          padding: "12px 18px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "0px",
          maxWidth: "300px",
          width: "auto",
          whiteSpace: "normal",
        },
        success: {
          duration: 3000,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            borderRadius: "0px",
            maxWidth: "700px",
            whiteSpace: "normal",
          },
        },
        error: {
          duration: 5000,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            borderRadius: "0px",
            maxWidth: "700px",
            whiteSpace: "normal",
          },
        },
      }}
    />
  );
};

// Funciones helper para mostrar toasts personalizados
export const showSuccessToast = (message) => {
  toast.success(message, {
    style: {
      background: "#1a1a1a",
      color: "#fff",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#1a1a1a",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    style: {
      background: "#1a1a1a",
      color: "#fff",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#1a1a1a",
    },
  });
};

export default CustomToast;
