import { useEffect, useState } from "react";
import InputCheckbox from "../common/InputCheckbox";
import ModalFormCertificate from "../components/Modals/ModalFormCertificate";
import { useStore } from "zustand";
import useWalletStore from "../store/useWalletStore";
import ModalCertificate from "../components/Modals/ModalCertificate";
import usePDFExport from "../hooks/usePDFExport";

const exampleProducts = [
  {
    name: "Camisa Origen",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 2",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 3",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 4",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 5",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 6",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 7",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 8",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 9",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 10",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 11",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
];

export function ProductListPage() {
  const { getDisplayName } = useStore(useWalletStore);
  const { exportToPDF, isExporting } = usePDFExport();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: Math.ceil(exampleProducts.length / 10),
    total: exampleProducts.length,
  });
  const [rowsSelected, setRowsSelected] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certificateOpened, setCertificateOpened] = useState();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const minRange = pagination.page * 10 - 10;
    const maxRange = pagination.page * 10;
    const paginatedProducts = exampleProducts.slice(minRange, maxRange);
    setProducts(paginatedProducts);
  }, [pagination]);

  const handlePageChange = (page) => {
    setPagination((pagination) => ({ ...pagination, page }));
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = isMobile ? 5 : 10;

    let startPage = Math.max(
      1,
      pagination.page - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisibleButtons - 1
    );

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="cursor-pointer hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed p-1"
      >
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 14.5C8.5 13.759 7.767 12.65 7.025 11.72C6.071 10.52 4.931 9.473 3.624 8.674C2.644 8.075 1.456 7.5 0.5 7.5C1.456 7.5 2.645 6.925 3.624 6.326C4.931 5.526 6.071 4.479 7.025 3.281C7.767 2.35 8.5 1.24 8.5 0.5"
            stroke="currentColor"
          />
        </svg>
      </button>
    );

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`cursor-pointer hover:text-slate-600 px-2 py-1 min-w-[32px] ${
            pagination.page === page ? "font-bold text-orange-600" : ""
          }`}
        >
          {page}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.totalPages}
        className="cursor-pointer hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed p-1"
      >
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 14.5C0.5 13.759 1.233 12.65 1.975 11.72C2.929 10.52 4.069 9.473 5.376 8.674C6.356 8.075 7.544 7.5 8.5 7.5C7.544 7.5 6.355 6.925 5.376 6.326C4.069 5.526 2.929 4.479 1.975 3.281C1.233 2.35 0.5 1.24 0.5 0.5"
            stroke="currentColor"
          />
        </svg>
      </button>
    );

    return buttons;
  };

  const renderMobileCards = () => {
    return (
      <div className="space-y-4">
        {products.map((product, id) => (
          <div
            key={id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-lg text-gray-900">
                {product.name}
              </h3>
              <InputCheckbox id={product.name} onCheck={onCheckProduct} />
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Emisor:</span>
                <span className="font-medium">{product.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tipo:</span>
                <span className="font-medium">{product.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fecha:</span>
                <span className="font-medium">{product.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ubicación:</span>
                <span className="font-medium">{product.location}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <span className="text-gray-500 text-xs">Certificado:</span>
                <a
                  href={product.certificationLink}
                  className="block text-orange-600 hover:text-orange-800 text-xs truncate mt-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {product.certificationLink}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleExportSelected = async () => {
    if (rowsSelected.length === 0) {
      alert("Por favor, selecciona al menos un certificado para exportar.");
      return;
    }

    const selectedProducts = exampleProducts.filter((product) =>
      rowsSelected.includes(product.name)
    );

    await exportToPDF(selectedProducts);
  };

  const onCheckProduct = (id, isChecked) => {
    if (id === "selectAll") {
      if (isChecked) setRowsSelected(products.map((product) => product.name));
      if (!isChecked) setRowsSelected([]);
    } else {
      if (isChecked) setRowsSelected((rows) => [...rows, id]);
      if (!isChecked)
        setRowsSelected((rows) => rows.filter((row) => row !== id));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 mb-8 sm:mb-20 gap-4">
          <h5 className="font-normal text-lg">Certificados</h5>
          <div className="flex justify-end items-center gap-4">
            <span className="font-normal text-lg">{getDisplayName()}</span>
            <div className="rounded-full w-10 h-10 bg-slate-500"></div>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-medium text-2xl sm:text-3xl">
            Productos Certificados
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handleExportSelected}
              disabled={rowsSelected.length === 0 || isExporting}
              className="py-2 px-4 text-center border border-black text-sm cursor-pointer hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isExporting ? "Exportando..." : "Exportar Certificado"}
            </button>
            <button
              onClick={() => setIsFormModalOpen(true)}
              className="py-2 px-4 text-center border border-black bg-black text-white text-sm cursor-pointer hover:bg-gray-800 transition-colors"
            >
              Nuevo Certificado
            </button>
          </div>
        </div>

        {isMobile ? (
          // Vista móvil - Tarjetas
          renderMobileCards()
        ) : (
          // Vista desktop - Tabla con scroll horizontal
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      <InputCheckbox
                        id="selectAll"
                        onCheck={onCheckProduct}
                        isChecked={rowsSelected.length === 10}
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Nombre
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Emisor
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Fecha
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Ubicación
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Link del Certificado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product, id) => (
                    <tr
                      key={id}
                      className={`${
                        rowsSelected.includes(product.name)
                          ? "bg-table-body-selected"
                          : "bg-white"
                      }`}
                    >
                      <td className="py-3 px-4">
                        <InputCheckbox
                          id={product.name}
                          onCheck={onCheckProduct}
                          isChecked={rowsSelected.includes(product.name)}
                        />
                      </td>
                      <td
                        onClick={() => {
                          setCertificateOpened(product);
                          setIsCertificateModalOpen(true);
                        }}
                        className="py-3 px-4 font-medium text-gray-900 hover:text-table-body-hover transition-colors cursor-pointer"
                      >
                        {product.name}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {product.source}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {product.type}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {product.date}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {product.location}
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={product.certificationLink}
                          className="text-orange-600 hover:text-orange-800 truncate block max-w-[200px]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product.certificationLink}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <span className="text-sm text-gray-600">Filas por página: 10</span>

          <div className="flex gap-2 items-center overflow-x-auto">
            {renderPaginationButtons()}
          </div>

          <span className="text-sm text-gray-600 whitespace-nowrap">
            Pág {pagination.page} de {pagination.totalPages}
          </span>
        </footer>
      </section>

      <ModalFormCertificate
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      />

      <ModalCertificate
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        certificate={certificateOpened}
      />
    </main>
  );
}

export default ProductListPage;
