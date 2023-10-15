import React, { useState } from "react";
import { ConsultaForm } from "../components/ConsultaForm";
import { ConsultaFormCurta } from "../components/ConsultaFormCurta";

export const HomePage = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState("larga");

  return (
    <>
      <section className="relative">
        <img
          src="https://images.pexels.com/photos/9052843/pexels-photo-9052843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Descriptive Imagery"
          className="w-full max-w-full h-auto md:h-[50vh] object-cover"
          style={{ objectPosition: "bottom" }}
        />
      </section>

      <section className="p-6 md:p-12">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Tipo de Estancia
          </h3>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setMostrarFormulario("corta")}
              className={`p-2 ${
                mostrarFormulario == "corta" ? "bg-blue-800" : "bg-blue-600"
              } text-white rounded-md hover:bg-blue-500 transition-all duration-300`}
            >
              Corta Duración
            </button>
            <button
              onClick={() => setMostrarFormulario("larga")}
              className={`p-2 ${
                mostrarFormulario == "larga" ? "bg-blue-800" : "bg-blue-600"
              } text-white rounded-md hover:bg-blue-500 transition-all duration-300`}
            >
              Larga Duración
            </button>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-6 max-w-3xl mx-auto">
            {mostrarFormulario === "larga" && <ConsultaForm />}
            {mostrarFormulario === "corta" && <ConsultaFormCurta />}
          </div>
        </div>
      </section>
    </>
  );
};
