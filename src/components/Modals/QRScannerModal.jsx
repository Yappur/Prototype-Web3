import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRScannerModal = ({ isOpen, onClose, onScan }) => {
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [flashSupported, setFlashSupported] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const streamRef = useRef(null);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      startScanner();
      // Prevenir scroll en móviles cuando el modal está abierto
      if (isMobile) {
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      stopScanner();
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  const checkFlashSupport = async (stream) => {
    try {
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();

      if (capabilities.torch) {
        setFlashSupported(true);
      }
    } catch (error) {
      console.log("Flash no soportado:", error);
      setFlashSupported(false);
    }
  };

  const toggleFlash = async () => {
    try {
      if (streamRef.current) {
        const track = streamRef.current.getVideoTracks()[0];
        await track.applyConstraints({
          advanced: [{ torch: !flashOn }],
        });
        setFlashOn(!flashOn);
      }
    } catch (error) {
      console.error("Error al controlar el flash:", error);
    }
  };

  const startScanner = async () => {
    try {
      setError(null);
      setIsScanning(true);

      codeReaderRef.current = new BrowserMultiFormatReader();

      const videoInputDevices =
        await codeReaderRef.current.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        throw new Error("No se encontraron cámaras disponibles");
      }

      const backCamera = videoInputDevices.find(
        (device) =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("trasera") ||
          device.label.toLowerCase().includes("environment")
      );

      const selectedDeviceId = backCamera
        ? backCamera.deviceId
        : videoInputDevices[0].deviceId;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedDeviceId,
          facingMode: "environment",
          width: { ideal: isMobile ? window.screen.width : 640 },
          height: { ideal: isMobile ? window.screen.height : 480 },
        },
      });

      streamRef.current = stream;

      await checkFlashSupport(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      codeReaderRef.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, error) => {
          if (result) {
            console.log("QR Code found:", result.getText());

            if (navigator.vibrate) {
              navigator.vibrate([200, 100, 200]);
            }

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
    setFlashOn(false);

    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

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

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Header con botones */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 p-4 flex justify-between items-center">
          <button
            onClick={handleClose}
            className="text-white text-2xl font-bold bg-black/30 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>

          <h2 className="text-white text-lg font-semibold">Escanear QR</h2>

          {flashSupported && (
            <button
              onClick={toggleFlash}
              className={`text-white text-xl bg-black/30 rounded-full w-10 h-10 flex items-center justify-center ${
                flashOn ? "bg-yellow-500/50" : "bg-black/30"
              }`}
            >
              {flashOn ? "🔦" : "💡"}
            </button>
          )}
        </div>

        {/* Video container */}
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: isScanning && !error ? "block" : "none",
            }}
            playsInline
            muted
          />

          {/* Overlay con marco de escaneo */}
          {isScanning && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="280"
                  height="280"
                  viewBox="0 0 252 252"
                  fill="none"
                >
                  <path
                    d="M70.5455 4L7.32727 7.32727L4 70.5455M181.455 4L244.673 7.32727L248 70.5455M181.455 248L244.673 244.673L248 181.455M70.5455 248L7.32727 244.673L4 181.455"
                    stroke="white"
                    strokeWidth="7"
                  />
                </svg>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center p-6">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-white text-lg mb-6">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    startScanner();
                  }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-medium"
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controles inferiores */}
        {isScanning && !error && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-black">
            <div className="flex justify-center gap-4">
              <button
                onClick={toggleScanning}
                className="px-8 py-3 bg-red-500 text-white rounded-lg text-lg font-medium"
              >
                Detener
              </button>
            </div>
            <p className="text-white text-center mt-3 text-sm">
              Apunta la cámara hacia el código QR
            </p>
          </div>
        )}
      </div>
    );
  }

  // Renderizado para desktop (modal normal)
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
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

            {isScanning && !error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="252"
                  height="252"
                  viewBox="0 0 252 252"
                  fill="none"
                >
                  <path
                    d="M70.5455 4L7.32727 7.32727L4 70.5455M181.455 4L244.673 7.32727L248 70.5455M181.455 248L244.673 244.673L248 181.455M70.5455 248L7.32727 244.673L4 181.455"
                    stroke="white"
                    strokeWidth="7"
                  />
                </svg>
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

            {flashSupported && isScanning && (
              <button
                onClick={toggleFlash}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  flashOn
                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                {flashOn ? "🔦" : "💡"}
              </button>
            )}

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
        </div>
      </div>
    </>
  );
};

export default QRScannerModal;
