import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputCheckbox from "../common/InputCheckbox";
import ModalFormCertificate from "../components/Modals/ModalFormCertificate";

// const exampleProducts = new Array(40).fill({
//   name: "Camisa Origen",
//   source: "Hilando al Sur",
//   type: "Textil",
//   date: "06-07-2027",
//   location: "Córdoba, Argentina",
//   certificationLink: "https://raiz.veri.link/tu-certificado",
// });

const exampleProducts = [
  {
    name: "Camisa Origen",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
  {
    name: "Camisa Origen 2",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
  {
    name: "Camisa Origen 3",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
  {
    name: "Camisa Origen",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
  {
    name: "Camisa Origen",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
  {
    name: "Camisa Origen",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
  {
    name: "Camisa Origen",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
  {
    name: "Camisa Origen",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
  {
    name: "Camisa Origen",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
  {
    name: "Camisa Origen",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
  {
    name: "Camisa Origen 11",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
  },
];

export function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: Math.ceil(exampleProducts.length / 10),
    total: exampleProducts.length,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const minRange = pagination.page * 10 - 10;
    const maxRange = pagination.page * 10;
    const paginatedProducts = exampleProducts.slice(minRange, maxRange);

    setProducts(paginatedProducts);
  }, [pagination]);

  const handlePageChange = (page) => {
    console.log("a");
    setPagination((pagination) => ({ ...pagination, page }));
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 10;

    let startPage = Math.max(
      1,
      pagination.page - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisibleButtons - 1
    );

    // Ajustar si estamos cerca del final
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Botón "Anterior"
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="cursor-pointer hover:text-slate-600"
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
            stroke="black"
          />
        </svg>
      </button>
    );

    // Botones numéricos
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`cursor-pointer hover:text-slate-600 ${
            pagination.page === page ? "active" : ""
          }`}
        >
          {page}
        </button>
      );
    }

    // Botón "Siguiente"
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.totalPages}
        className="cursor-pointer hover:text-slate-600"
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
            stroke="black"
          />
        </svg>
      </button>
    );

    return buttons;
  };
  return (
    <main className="grid">
      <section className="px-8 py-6 w-full max-w-full">
        <header className="flex justify-between items-center py-2 mb-20">
          <h5 className="font-normal text-lg">Certificados</h5>
          <div className="flex justify-end items-center gap-4">
            <span className="font-normal text-lg">Constanza</span>
            <div className="rounded-full p-4 bg-slate-500"></div>
          </div>
        </header>
        <div className="flex justify-between gap-4">
          <h2 className="font-medium text-3xl">Productos Certificados</h2>
          <div className="flex gap-5">
            <button className="py-2 px-4 text-center border border-button-border text-sm cursor-pointer">
              Exportar Certificado
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-2 px-4 text-center border border-black bg-black text-white text-sm cursor-pointer"
            >
              Nuevo Certificado
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <tbody>
              <tr className="text-table-header border-table-border border-b-1 py-1">
                <th className="font-medium text-start">
                  <InputCheckbox id={"selectAll"} />
                </th>
                <th className="font-medium py-2 text-start">Nombre</th>
                <th className="font-medium py-2 text-start">Emisor</th>
                <th className="font-medium py-2 text-start">Tipo</th>
                <th className="font-medium py-2 text-start">Fecha</th>
                <th className="font-medium py-2 text-start">Ubicación</th>
                <th className="font-medium py-2 text-start">
                  Link del Certificado
                </th>
              </tr>
              {products.length > 0 &&
                products.map((product, id) => {
                  return (
                    <tr
                      key={id}
                      className=" text-table-body border-table-border border-b-1 hover:bg-[#FFF8F3AB] hover:cursor-pointer transition-all"
                    >
                      <td>
                        <InputCheckbox id={`${product.name}-check`} />
                      </td>
                      <td className="font-medium py-2">{product?.name}</td>
                      <td className="font-medium py-2">{product?.source}</td>
                      <td className="font-medium py-2">{product?.type}</td>
                      <td className="font-medium py-2">{product?.date}</td>
                      <td className="font-medium py-2">{product?.location}</td>
                      <td className="font-medium py-2">
                        {product?.certificationLink}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <footer className="flex justify-between gap-4 mt-8">
          <span>Filas por página: 10</span>

          <div className="flex gap-3 items-center">
            {renderPaginationButtons()}
          </div>
          <span>
            Pág {pagination.page} de {pagination.totalPages}
          </span>
        </footer>
      </section>
      <ModalFormCertificate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}

export default ProductListPage;
