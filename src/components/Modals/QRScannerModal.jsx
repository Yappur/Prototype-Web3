import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRScannerModal = ({ isOpen, onClose, onScan }) => {
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      startScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isOpen]);

  const startScanner = async () => {
    try {
      setError(null);
      setIsScanning(true);

      // Crear instancia del lector de códigos
      codeReaderRef.current = new BrowserMultiFormatReader();

      // Obtener dispositivos de video disponibles
      const videoInputDevices =
        await codeReaderRef.current.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        throw new Error("No se encontraron cámaras disponibles");
      }

      // Preferir cámara trasera si está disponible
      const backCamera = videoInputDevices.find(
        (device) =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("trasera") ||
          device.label.toLowerCase().includes("environment")
      );

      const selectedDeviceId = backCamera
        ? backCamera.deviceId
        : videoInputDevices[0].deviceId;

      // Iniciar el stream de video
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedDeviceId,
          facingMode: "environment", // Preferir cámara trasera
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Iniciar la decodificación continua
      codeReaderRef.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, error) => {
          if (result) {
            console.log("QR Code found:", result.getText());
            onScan(result.getText());
            stopScanner();
          }

          if (error && error.name !== "NotFoundException") {
            console.warn("Error scanning:", error);
          }
        }
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
      let errorMessage = "Error al iniciar el escáner";

      if (err.name === "NotAllowedError") {
        errorMessage =
          "Permisos de cámara denegados. Por favor, permite el acceso a la cámara.";
      } else if (err.name === "NotFoundError") {
        errorMessage = "No se encontró ninguna cámara en el dispositivo.";
      } else if (err.name === "NotSupportedError") {
        errorMessage = "El navegador no soporta el acceso a la cámara.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    setIsScanning(false);

    // Detener el lector de códigos
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }

    // Detener el stream de video
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Limpiar el video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleScanning = () => {
    if (isScanning) {
      stopScanner();
    } else {
      startScanner();
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        {/* Botón de cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
        >
          ×
        </button>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Escanear Producto
          </h2>
          <p className="text-gray-600">
            Apunta la cámara hacia el código QR del producto
          </p>
        </div>

        {/* Contenedor del escáner */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              display: isScanning && !error ? "block" : "none",
            }}
            playsInline
            muted
          />

          {/* Overlay con marco de escaneo */}
          {isScanning && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-4 border-white border-dashed rounded-lg flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-green-500 rounded-lg animate-pulse"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center bg-gray-200 h-80">
              <div className="text-center p-4">
                <div className="text-red-500 text-4xl mb-2">⚠️</div>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          {!isScanning && !error && (
            <div className="flex items-center justify-center bg-gray-200 h-80">
              <div className="text-center p-4">
                <div className="text-gray-400 text-4xl mb-2">📷</div>
                <p className="text-gray-600 text-sm">
                  Presiona "Iniciar" para comenzar el escaneo
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Controles */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={toggleScanning}
            disabled={!!error}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              error
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isScanning
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isScanning ? "Detener" : "Iniciar"}
          </button>

          {error && (
            <button
              onClick={() => {
                setError(null);
                startScanner();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Reintentar
            </button>
          )}

          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>

        {/* Instrucciones */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>• Mantén el código QR dentro del marco verde</p>
          <p>• Asegúrate de tener buena iluminación</p>
          <p>• El escaneo es automático al detectar el código</p>
        </div>

        {/* Estado de escaneo */}
        {isScanning && !error && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Buscando código QR...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScannerModal;
