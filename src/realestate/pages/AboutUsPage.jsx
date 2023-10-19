import React from "react";
import madBridgeLogo from "../../assets/madlogo.png"

export const AboutUsPage = () => {
  return (
    <section>
      <div>
        <img className="mx-auto m-20" src={madBridgeLogo} alt="MadBridge logo" />
      </div>

      <h1 className="hidden">Sobre MadBridge: RP</h1>

      <div className="bg-gray-100 rounded-lg shadow-md p-6 ml-12 mr-12 mb-12">
        <h2 className="text-lg md:text-xl tracking-wide font-semibold">Nuestra historia</h2>
        <p className="text-base mb-3">
          ¡Bienvenidos al website de MadBridge: Rental Predicts! Somos un equipo apasionado de profesionales que ha surgido de la experiencia intensiva en los bootcamps de TheBridge . Conformamos tres verticales especializadas: Data Science, Full Stack y Ciberseguridad. Nuestra colaboración comenzó como respuesta al proyecto fin de bootcamp, tambien llamado "Desafío de Tripulaciones", y desde entonces, hemos unido fuerzas para abordar desafíos relevantes en el mundo tecnológico.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <article className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-center">Data Science</h3>
            <p className="text-base mb-2">
              Enfocados en la interpretación y extracción de conocimientos a partir de datos, nuestro equipo de Data Science utiliza técnicas avanzadas para analizar patrones y tendencias. Estamos comprometidos a aplicar el poder de los datos para mejorar la toma de decisiones.
            </p>
          </article>

          <article className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2  text-center">Full Stack</h3>
            <p className="text-base mb-2">
              Desde el diseño hasta la implementación, nuestro equipo Full Stack abarca todos los aspectos del desarrollo web tanto de Backend como de Frontend. Nos esforzamos al máximo por crear experiencias digitales fluidas e intuitivas, de todos y para todos.
            </p>
          </article>

          <article className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-center">Ciberseguridad</h3>
            <p className="text-base mb-2">
              Vuestra seguridad, usuarios, es nuestra prioridad. Con un enfoque en la protección de sistemas y datos, nuestro equipo de Ciberseguridad trabaja incansablemente para salvaguardar la integridad y confidencialidad de la información.
            </p>
          </article>
        </div>
        <div className="pt-4 pb-4">
          <h2 className="text-lg md:text-xl tracking-wide font-semibold pt-3">El Proyecto: Predicción de Precios de Alquiler en Madrid</h2>
          <p className="text-base mb-4">
            Nuestra motivación central es abordar desafíos significativos. Hemos unido nuestras habilidades para desarrollar una página web innovadora que tiene como objetivo predecir los precios de alquiler de viviendas en Madrid, tanto para estancias vacacionales como de medio plazo. Este proyecto es nuestra respuesta a la necesidad de proporcionar a la comunidad una información precisa y útil para la toma de decisiones en el ámbito de alquiler de viviendas.
          </p>
        </div>
        <h2 className="text-lg md:text-xl tracking-wide font-semibold">Nuestro Compromiso</h2>
        <p className="text-base mb-4">
          En MadBridge, nos comprometemos a la excelencia y la innovación. Creemos en el poder de la colaboración y la diversidad de habilidades para superar cualquier desafío. Estamos emocionados de compartir nuestro conocimiento y entusiasmo con ustedes a través de este proyecto y de futuros.
        </p>

        <p className="text-base">¡Gracias por visitar nuestra página y ser parte de nuestra historia!</p>
      </div>
    </section>
  );
};