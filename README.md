# Predicción precios de inmobiliaria

Este es un proyecto de React que permita calcular el precio que se debería cobrar por el alquiler de un inmueble, según sus characteristicas.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema antes de comenzar:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/)
- [Vite](https://vitejs.dev/)

## Configuración del Proyecto

1. Clona este repositorio en tu computadora:

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

   NOTE: versiones de dependencias diferentes a las usadas pueden causar conflictos. Dependencias y sus versiones utilizadas en este proyecto son:

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
- /assets: recursos como imagenes utilizados en el proyecto
- /auth: carpeta donde se guardan páginas y componentes accessibles al usuario antes de registrarse
- /components: Carpeta donde se encuentran los componentes React comun a traves de todas las secciones del proyecto.
- /context: carpeta donde se guardan los archivos context y provider donde se guarda información que se necesita acceder desde diferentes direcciones en la app
- /helpers: dataFetch función que facilita los fetches desde diferentes partes de la web
- /hook: donde se guardan archivos de tipo hook
- /realestate: todos los componentes y páginas relacionadas con funciones de inmobiliaria a los que pueden acceder usuarios registrados y logueados
- /routes: estructura de rutas del proyecto.
- /App.js: Componente principal de la aplicación.
  /main.js: Punto de entrada de la aplicación.

## Related documents

APIs are used to send to and receive from data base. Three APIs are used:

1. API que se conecta a una aplicación de "machine learning" y recoge una prediccion basado en los datos enviado en la solicitud. Predicción sobre precio de alquileres de LARGA estancia.
   <br /> Documentación:

2. API que se conecta a una aplicación de "machine learning" y recoge una prediccion basado en los datos enviado en la solicitud. Predicción sobre precio de alquileres de CORTA estancia.
   <br /> Documentación:

3. API que guarda y accede a una base de datos MongoDB donde se guardan las solicitudes hechos a las dos primeras APIS. Datos y predicción guardado.
   <br /> Github repository de esta API: https://github.com/navarrorafa/trip-jun-back
   <br /> Documentación:

## Sitio Web

Sitio web desplegado se encuentra en:<br /> https://trip-jun-bridge.netlify.app
