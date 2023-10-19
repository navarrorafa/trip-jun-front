import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dataFetch } from '../../helpers/dataFetch';
import { ClipLoader } from "react-spinners";
import { UserContext } from '../../context/UserContext';
import { Graphics } from './Graphics';


export const ConsultaForm = () => {
  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm();
  const [formData, setFormData] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userStatus } = useContext(UserContext);
  const { uid } = userStatus
  const [activeGrafico, setActiveGrafico] = useState(false)
  const [graphKey, setGraphKey] = useState(0)
  const selectedDistrito = watch("distrito");






  const onSubmit = async (data) => {
    setFormData(data);
    setIsLoading(true);
    setActiveGrafico(true)

    const newData = {
      ...data,
      area: data.area ? parseInt(data.area) : 0, 
      banos: data.banos ? parseInt(data.banos) : 0,
      furnished: data.furnished ? parseInt(data.furnished) : 0,
      hab: data.hab ? parseInt(data.hab) : 0,
   };

    try {
      const response = await dataFetch("https://proxyapidesafio.onrender.com/api2/predict", 'POST', newData);
      //Manejando respuesta
      if (response.ok) {

        setData(response.data);
        setGraphKey(graphKey + 1)

        const precio = response.data.prediction.toString()

        const body = { ...data, prediction: precio, uid: uid, estanc: "larga", }

        const user = await dataFetch("https://trip-jun-bridge-back.onrender.com/api/v1/consulta/crear", 'POST', body)

      } else {
        throw new Error(response.msg);
      }

    } catch (error) {
      setError(error.message);
      console.error("Error in fetch:", error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };


  const distritosBairros = {
    'Chamartín': ['Bernabéu - Hispanoamérica', 'Prosperidad', 'Castilla', 'El Viso', 'Nueva España', 'Ciudad Jardín'],
    'Latina': ['Los Cármenes', 'Puerta del Ángel', 'Lucero', 'Aluche', 'Campamento', 'Águilas', 'Cuatro vientos'],
    'Arganzuela': ['Legazpi', 'Palos de Moguer', 'Chopera', 'Acacias', 'Delicias', 'Imperial', 'Atocha'],
    'Centro': ['Sol', 'Embajadores - Lavapiés', 'Justicia - Chueca', 'Universidad - Malasaña', 'Palacio', 'Cortes - Huertas'],
    'Salamanca': ['Recoletos', 'Goya', 'Castellana', 'Lista', 'Fuente del Berro', 'Guindalera'],
    'Fuencarral': ['Tres Olivos - Valverde', 'La Paz', 'Mirasierra', 'Peñagrande', 'Pilar', 'El Pardo', 'Fuentelarreina', 'Las Tablas', 'Montecarmelo'],
    'Ciudad Lineal': ['Pueblo Nuevo', 'Costillares', 'Concepción', 'Ventas', 'San Juan Bautista', 'Quintana', 'San Pascual', 'Colina', 'Atalaya'],
    'Moncloa': ['Argüelles', 'Ciudad Universitaria', 'Valdezarza', 'Casa de Campo', 'Aravaca', 'Valdemarín', 'La Florida - El Plantío'],
    'Chamberí': ['Almagro', 'Nuevos Ministerios - Ríos Rosas', 'Trafalgar', 'Arapiles', 'Gaztambide', 'Vallehermoso'],
    'San Blas': ['Arcos', 'Simancas', 'Salvador', 'Rejas', 'Rosas - Musas', 'Canillejas', 'Hellín', 'Amposta'],
    'Retiro': ['Pacífico', 'Ibiza', 'Jerónimos', 'Niño Jesús', 'Adelfas', 'Estrella'],
    'Villaverde': ['Los Ángeles', 'San Andrés', 'Los Rosales', 'Butarque', 'San Cristóbal'],
    'Barajas': ['Timón', 'Casco Histórico de Barajas', 'Alameda de Osuna', 'Corralejos - Campo de las Naciones'],
    'Hortaleza': ['Canillas', 'Piovera - Conde Orgaz', 'Valdebebas - Valdefuentes', 'Pinar del Rey', 'Apóstol Santiago', 'Palomas', 'Sanchinarro', 'Virgen del Cortijo - Manoteras'],
    'Puente de Vallecas': ['Numancia', 'San Diego', 'Palomeras sureste', 'Palomeras bajas', 'Portazgo', 'Entrevías'],
    'Usera': ['San Fermín', 'Moscardó', 'Zofio', 'Almendrales', 'Orcasur', 'Orcasitas', 'Pradolongo'],
    'Carabanchel': ['Comillas', 'Opañel', 'Puerta bonita', 'San Isidro', 'Vista Alegre', 'Abrantes', 'Buenavista', 'Pau de Carabanchel'],
    'Moratalaz': ['Marroquina', 'Fontarrón', 'Vinateros', 'Media Legua', 'Horcajo'],
    'Tetuán': ['Berruguete', 'Almenara', 'Castillejos', 'Cuatro Caminos', 'Bellas Vistas', 'Valdeacederas'],
    'Villa de Vallecas': ['Casco Histórico de Vallecas', 'Santa Eugenia', 'Ensanche de Vallecas - Valdecarros'],
    'Vicálvaro': ['Casco histórico de Vicálvaro', 'Ambroz', 'El Cañaveral - Los Berrocales', 'Valdebernardo - Valderribas']
  };

  return (
    <>

      <div className="flex flex-wrap justify-center ">

        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-6 rounded-lg shadow-md space-y-3 h-full max-w-xl w-full  m-4 ">


          {/* Campo de selección de distrito */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="distrito">
              Distrito
            </label>
            <select
              id="distrito"
              {...register("distrito", {
                required: "Por favor, selecione un distrito.",
              })}
              className={`p-2 border rounded-md bg-white ${errors.distrito ? "border-red-500" : ""
                }`}
            >
              <option value="" selected disabled>Seleccione distrito</option>
              {Object.keys(distritosBairros).map((distrito) => (
                <option key={distrito} value={distrito}>
                  {distrito}
                </option>
              ))}
            </select>
            {errors.distrito && (
              <span className="text-xs text-red-500">{errors.distrito.message}</span>
            )}
          </div>

          {/* Campo de selección de barrio */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="barrio">
              Barrio
            </label>
            <select
              id="barrio"
              {...register("barrio", {
                required: "Por favor, selecione un barrio.",
              })}
              className={`p-2 border rounded-md bg-white ${errors.barrio ? "border-red-500" : ""
                }`}
            >
              <option value="" selected disabled>Seleccione barrio</option>
              {selectedDistrito &&
                distritosBairros[selectedDistrito].map((barrio) => (
                  <option key={barrio} value={barrio}>
                    {barrio}
                  </option>
                ))}
            </select>
            {errors.barrio && (
              <span className="text-xs text-red-500">
                {errors.barrio.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">

            {/* TIPO DE ESTANCIA */}
            <label htmlFor="tipo" className="font-semibold">Tipo de Vivienda</label>
            <select {...register("tipo", { required: true })}
              className={`p-2 border rounded-md bg-white ${errors.tipo ? "border-red-500" : ""
                }`}>
              <option value="" selected disabled>Seleccione tipo de vivienda</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Dúplex">Dúplex</option>
              <option value="Piso">Piso</option>
              <option value="Ático">Ático</option>
            </select>
          </div>


          {/* HABITACIONES */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="hab" className="font-semibold">Indique el número de habitaciones</label>
            <input
              {...register("hab", { required: "Necesitamos conocer el número de habitaciones", min: 1 })}
              className={`p-2 border rounded-md ${errors.hab ? "border-red-500" : ""
                }`}
              type="number"
              name="hab"
            />
            {errors.hab && <span>{errors.hab.message}</span>}
          </div>

          {/* BAÑOS */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="banos" className="font-semibold">Indique el número de Baños</label>
            <input
              {...register("banos", { required: "Necesitamos conocer el número de baños", min: 1 })}
              className={`p-2 border rounded-md ${errors.banos ? "border-red-500" : ""
                }`}
              type="number"
              name="banos"
            />
            {errors.banos && <span className="text-xs text-red-500">{errors.banos.message}</span>}
          </div>

          {/* AREA M2 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="area" className="font-semibold">Indique el area en m2</label>
            <input
              {...register("area", { required: "Necesitamos conocer el número de baños", min: 1 })}
              className={`p-2 border rounded-md ${errors.area ? "border-red-500" : ""
                }`}
              type="number"
              name="area"
            />
            {errors.area && <span className="text-xs text-red-500">{errors.area.message}</span>}
          </div>


          {/* AMUEBLADO */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">¿La propiedad es amueblada?</label>
          </div>
          <label>Sí </label>
          <input
            {...register("furnished", { required: "Por favor, indique si la propiedad es amueblada" })}
            type="radio"
            name="furnished"
            value="1"
            className='me-5'
          />
          <label>No </label>
          <input
            {...register("furnished", { required: "Por favor, indique si la propiedad es amueblada" })}
            type="radio"
            name="furnished"
            value="0"
            className='me-5'
          />
          {errors.furnished && <span className="text-xs text-red-500">{errors.furnished.message}</span>}

          {/* CONDICIONES  */}

          <div className="flex flex-col space-y-2">
            <label className="font-semibold">¿En que condición se encuentra la propiedad?</label>
          </div>
          <label>Normal </label>
          <input
            {...register("condicion", { required: "Por favor, indique la condición de la propiedad" })}
            type="radio"
            name="condicion"
            value="normal"
            className='me-5'
          />
          <label>Alta Calidad </label>
          <input
            {...register("condicion", { required: "Por favor, indique la condición de la propiedad" })}
            type="radio"
            name="condicion"
            value="alta-calidad"
            className='me-5'
          />
          <label>Lujosa </label>
          <input
            {...register("condicion", { required: "Por favor, indique la condición de la propiedad" })}
            type="radio"
            name="condicion"
            value="lujosa"
            className='me-5'
          />
          {errors.condicion && <span className="text-xs text-red-500">{errors.condicion.message}</span>}



          <input
            type="submit"
            value="Enviar"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300"
          />


        </form>


        {/* cambios */}


        {data && !isLoading && (
          <div className="max-w-xl m-4 ">
            <div className="flex flex-col justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
              <>
                <p className="text-4xl font-semibold text-gray-800 mb-4">
                  ¡Gracias por su consulta!
                </p>
                <p className="text-2xl text-gray-800">
                  Basado en su búsqueda, la predicción mensual para su estadía de larga duración es de:
                </p>


                <div className=" bg-white py-4 px-8  rounded-lg text-center mx-auto mt-4">

                  <p className="text-5xl font-bold text-blue-800 mb-2">
                    € {data.prediction}
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    mensuales
                  </p>
                </div>




                <p className="pb-4 font-bold text-green-800 text-3xl mt-4">{data.fiabilidad}</p>
                <p className="text-2xl mt-4">
                  ¡Esperamos que esta información le sea útil!
                </p>
              </>
            </div>
          </div>

        )}


        {/* Verifica si está cargando para mostrar spinner de loading */}
        {isLoading && (
          <div className="w-full md:w-auto m-4 ">
            <div className="flex flex-col justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
              <ClipLoader
                size={35} // Tamaño del spinner
                loading={isLoading}
                className="text-gray-800 mx-auto"
              />
              <p className="mt-4 text-lg text-gray-800 font-semibold">Cargando...</p>
            </div>
          </div>
        )}

        {/* Manejo de errores para mostrar en cada caso */}
        {error && (
          <div className="w-full md:w-auto m-4 ">
            <div className="flex flex-col justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
              <p>Erro: {error}</p>
            </div>
          </div>
        )}

      </div>


      {/* Grafico Historial*/}
      <div className=" px-4 h-[500px] my-4">
        {activeGrafico && (
          <>
            <p className="text-xl font-semibold text-gray-800 mb-4 text-center">Historial de Consultas</p>
            <div className="p-6 bg-gray-100 w-full rounded-lg shadow-md h-full mx-auto max-w-6xl wGrafica">
              <Graphics key={graphKey} />
            </div>
          </>
        )}
      </div>

    </>
  );
};
