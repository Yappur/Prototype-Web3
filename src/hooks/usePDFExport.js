import { useState } from "react";
const usePDFExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async (certificate) => {
    setIsExporting(true);

    try {
      const printContent = document.createElement("div");
      printContent.innerHTML = `
        <div style="width: 540px; padding: 32px; background-color: white; font-family: system-ui, -apple-system, sans-serif; color: #111827;">
          <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 64px;">
            <h2 style="font-weight: 600; font-size: 24px; margin-bottom: 4px; color: #111827;">${certificate.name}</h2>
            <p style="font-weight: 300; color: #374151;"><span style="font-weight: 500;">Tipo de producto: </span>${certificate.type}</p>
            <p style="font-weight: 300; color: #374151;"><span style="font-weight: 500;">Emisor: </span>${certificate.source}</p>
            <p style="font-weight: 300; color: #374151;"><span style="font-weight: 500;">Fecha de Emision: </span>${certificate.date}</p>
            <p style="font-weight: 300; color: #374151;"><span style="font-weight: 500;">Fecha de Producción: </span>${certificate.date}</p>
            <p style="font-weight: 300; color: #374151;"><span style="font-weight: 500;">Lugar de Producción: </span>${certificate.location}</p>
            <p style="font-weight: 300; text-align: justify; color: #374151; line-height: 1.5;"><span style="font-weight: 500;">Descripción: </span>${certificate.description}</p>
          </div>
        </div>
      `;

      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;

      const style = document.createElement("style");
      style.textContent = `@media print { body { margin: 0; padding: 20px; background: white !important; } * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; } }`;
      document.head.appendChild(style);

      window.print();

      document.body.innerHTML = originalContents;
      document.head.removeChild(style);
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      alert("Error al generar el PDF. Por favor, inténtalo de nuevo.");
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToPDF, isExporting };
};

export default usePDFExport;
