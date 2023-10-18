import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const StartPage = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Create an event listener to update the screenWidth state when the window is resized.
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Attach the event listener to the window.
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
        <section className="relative h-screen w-screen grid place-items-center overflow-hidden">
          <div className="relative w-screen h-screen">
            <iframe
              src={
                screenWidth < 600
                  ? "https://player.vimeo.com/video/419099098?autoplay=1&muted=1&background=1&loop=1&byline=0&title=0"
                  : "https://player.vimeo.com/video/419093280?autoplay=1&muted=1&background=1&loop=1&byline=0&title=0"
              }
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 top-1/2 -translate-y-1/2 pb-16"
              style={{width: "100%", height: "200%"}}

            ></iframe>
          </div>
          <div className="absolute  flex flex-col justify-center items-center text-center w-full h-full bg-black bg-opacity-50 px-10 sm:p-4">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-10">
              ¿Tu alquiler vacacional tiene un buen precio?
            </h1>
            <p className="text-lg md:text-xl text-white mb-10">
              Descubre en segundos si estás ante una oferta justa o un precio
              sobrevalorado en Madrid.
            </p>
            <Link
              to="/register"
              className="bg-gray-800 text-xl text-white  px-6 py-3 rounded-md hover:bg-blue-600"
            >
              Regístrate
            </Link>
          </div>
        </section>

        <section className=" py-12 px-4 md:px-0">
          <div className="container mx-auto space-y-8">
            <h2 className="text-2xl md:text-4xl text-gray-900 font-semibold mb-4 text-center">
              ¿Cómo funciona?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-medium">
                  Paso 1: Introduce los Detalles
                </h3>
                <p className="text-lg text-gray-700">
                  Comienza introduciendo algunos detalles clave del inmueble que
                  encontraste. No necesitamos mucha información, solo lo básico
                  para comenzar.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-medium">
                  Paso 2: Analizamos el Mercado
                </h3>
                <p className="text-lg text-gray-700">
                  Nuestro algoritmo usa datos actuales del mercado inmobiliario
                  de Madrid para ofrecerte una estimación precisa. Analizamos
                  las tendencias y comparamos con propiedades similares.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-medium">
                  Paso 3: Recibe tu Estimación
                </h3>
                <p className="text-lg text-gray-700">
                  En poco tiempo, te proporcionamos un análisis, sabrás si el
                  alquiler está sobrevalorado o tiene un precio justo. Así
                  puedes tomar una decisión corroborada y segura.
                </p>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};
