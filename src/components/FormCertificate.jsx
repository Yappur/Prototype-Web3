import React, { useState } from "react";

export default function FormCertificate() {
  const [fecha, setFecha] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [mostrarCalendar, setMostrarCalendar] = useState(false);
  const [tipoProducto, setTipoProducto] = useState("");
  const [lugarProduccion, setLugarProduccion] = useState("");
  const [mostrarTipoSelect, setMostrarTipoSelect] = useState(false);
  const [mostrarLugarSelect, setMostrarLugarSelect] = useState(false);

  const handleImagenChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  // Función para manejar cuando se suelta un archivo en la zona de arrastre
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const formatearFecha = (fechaString) => {
    if (!fechaString) return "";
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const tiposProducto = [
    { value: "indumentaria", label: "Indumentaria" },
    { value: "alimento", label: "Alimento" },
    { value: "artesania", label: "Artesanía" },
    { value: "cosmetica", label: "Cosmética" },
    { value: "otro", label: "Otro" },
  ];

  const lugaresProduccion = [
    { value: "buenosaires", label: "Buenos Aires" },
    { value: "cordoba", label: "Córdoba" },
    { value: "mendoza", label: "Mendoza" },
    { value: "otro", label: "Otro" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-medium mb-4">Bienvenido/a Usuario.</h1>
        <p className="text-black">
          Emití el certificado de autenticidad de tu producto sostenible en
          segundos.
        </p>
      </div>

      {/* Formulario principal */}
      <div className="space-y-6">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-1">
            Nombre del producto
          </label>
          <input
            id="nombre"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
          />
        </div>

        <div className="relative">
          <label htmlFor="tipo" className="block text-sm font-medium mb-1">
            Tipo de producto
          </label>
          <button
            type="button"
            className="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
            onClick={() => setMostrarTipoSelect(!mostrarTipoSelect)}
          >
            <span className={tipoProducto ? "text-gray-900" : "text-gray-400"}>
              {tipoProducto
                ? tiposProducto.find((t) => t.value === tipoProducto)?.label
                : "Ej: Indumentaria, Alimento, Artesanía..."}
            </span>
            <div className="h-4 w-4 text-gray-400"></div>
          </button>
          {mostrarTipoSelect && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {tiposProducto.map((tipo) => (
                <button
                  key={tipo.value}
                  type="button"
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => {
                    setTipoProducto(tipo.value);
                    setMostrarTipoSelect(false);
                  }}
                >
                  {tipo.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium mb-1"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            placeholder="Describe el producto, su origen o proceso."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Imagen del producto
          </label>
          <div
            className="border border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("imagen-input")?.click()}
          >
            {imagenPreview ? (
              <img
                src={imagenPreview}
                alt="Vista previa"
                className="max-h-40 mx-auto rounded"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <div className="h-10 w-10 mb-2 text-gray-400"></div>
                <p>Arrastrá una imagen o hacé clic para subir</p>
                <p className="text-sm mt-2">Examinar archivos</p>
              </div>
            )}
            <input
              id="imagen-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImagenChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Fecha de producción
            </label>
            <button
              type="button"
              className="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
              onClick={() => setMostrarCalendar(!mostrarCalendar)}
            >
              <span className={fecha ? "text-gray-900" : "text-gray-500"}>
                {fecha
                  ? formatearFecha(fecha)
                  : "Elegí una fecha desde el dropdown"}
              </span>
              <div className="h-4 w-4 text-gray-400"></div>
            </button>
            {mostrarCalendar && (
              <div className="absolute z-10 mt-1 p-3 bg-white border border-gray-300 rounded-md shadow-lg">
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={fecha}
                  onChange={(e) => {
                    setFecha(e.target.value);
                    setMostrarCalendar(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* Campo: Lugar de producción */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Lugar de producción
            </label>
            <button
              type="button"
              className="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
              onClick={() => setMostrarLugarSelect(!mostrarLugarSelect)}
            >
              <span
                className={lugarProduccion ? "text-gray-900" : "text-gray-400"}
              >
                {lugarProduccion
                  ? lugaresProduccion.find((l) => l.value === lugarProduccion)
                      ?.label
                  : "Elegí un lugar desde el dropdown"}
              </span>
              <div className="h-4 w-4 text-gray-400"></div>
            </button>
            {mostrarLugarSelect && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {lugaresProduccion.map((lugar) => (
                  <button
                    key={lugar.value}
                    type="button"
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    onClick={() => {
                      setLugarProduccion(lugar.value);
                      setMostrarLugarSelect(false);
                    }}
                  >
                    {lugar.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#202715] hover:bg-[#14180e] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Emitir Certificado
          </button>
        </div>
      </div>
    </div>
  );
}
