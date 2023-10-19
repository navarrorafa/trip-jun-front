# Predicción precios de alquileres en Madrid

Proyecto de React que permite calcular el precio justo del alquiler de un inmueble, según sus características.

## Requisitos Previos

Asegúrate de tener instalado en tu sistema antes de comenzar:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/)
- [Vite](https://vitejs.dev/)

## Configuración del Proyecto

1. Clona este repositorio en tu equipo:

   ```bash
   git clone https://github.com/navarrorafa/trip-jun-front.git
   ```

2. Navega a la carpeta del proyecto:

   ```bash
   cd <ruta a la carpeta clonada>
   ```

3. Instala las dependencias del proyecto utilizando yarn:

   ```bash
   yarn
   ```

   NOTA: Versiones de dependencias diferentes a las usadas pueden causar conflictos. Las dependencias y sus versiones utilizadas en este proyecto son:

- "@emailjs/browser": "^3.11.0",
- "chart.js": "^4.4.0",
- "date-fns": "^2.30.0",
- "firebase": "^10.4.0",
- "jsdocs": "^1.0.0",
- "prop-types": "^15.8.1",
- "react": "^18.2.0",
- "react-chartjs-2": "^5.2.0",
- "react-datepicker": "^4.20.0",
- "react-dom": "^18.2.0",
- "react-hook-form": "^7.47.0",
- "react-icons": "^4.11.0",
- "react-input-mask": "^2.0.4",
- "react-router-dom": "^6.16.0",
- "react-spinners": "^0.13.8",
- "recharts": "^2.8.0"

4. Una vez que hayas configurado el proyecto, puedes ejecutar la aplicación de desarrollo de la siguiente manera::

   ```bash
   yarn dev
   ```

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

- /public: Contiene archivos estáticos.
- /src: Aquí es donde se encuentra el código fuente de la aplicación React.
- /assets: Recursos como imágenes utilizadas en el proyecto.
- /auth: Carpeta donde se guardan páginas y componentes accessibles al usuario antes de registrarse.
- /components: Carpeta donde se encuentran los componentes React comunes a través de todas las secciones del proyecto.
- /context: Carpeta donde se guardan los archivos context y provider donde se guarda información a la que se necesita acceder desde diferentes direcciones en la app.
- /helpers: Carpeta donde se guardan los helpers como el dataFetch que facilita los fetchs desde diferentes partes de la web.
- /hook: Carpeta donde se guardan archivos de tipo hook
- /realestate: Todos los archivos (componentes y páginas) relacionadas con funciones para la funcionalidad principal de la app y a los que pueden acceder usuarios registrados al loguearse.
- /routes: Estructura de rutas del proyecto.
- /App.js: Componente principal de la aplicación.
  /main.js: Punto de entrada de la aplicación.

## Documentos 

Las tres APIs usadas para el envio y recepcion de datos de las BBDD son:

1. API que se conecta a una aplicación de "machine learning" y recoge una predicción basada en los datos enviados en la solicitud. Predicción sobre precio de alquileres de MEDIA estancia.
   <br /> Documentación:

2. API que se conecta a una aplicación de "machine learning" y recoge una predicción basada en los datos enviados en la solicitud. Predicción sobre precio de alquileres de estancia VACACIONAL.
   <br /> Documentación:

3. API que guarda y accede a una base de datos MongoDB donde se guardan las solicitudes hechas a las dos primeras APIS. Datos y predicción guardados como historial para su uso en gráficas.
   <br /> Github repository de esta API: https://github.com/navarrorafa/trip-jun-back
   <br /> Documentación:

## Sitio Web

Sitio web desplegado se encuentra en:<br /> https://trip-jun-bridge.netlify.app
