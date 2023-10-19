import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { dataFetch } from "../../helpers/dataFetch";
import { format } from "date-fns";
import { DayPick } from "./DayPick";
import { UserContext } from "../../context/UserContext";
import { GraphicsCorto } from "./GraphicsCorto";

export const ConsultaFormCurta = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();


  const selectedDistrito = watch("distrito");
  const [formData, setFormData] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //date one default to current date
  const [dateOne, setDateOne] = useState(new Date());
  //make dateTwo default dayOne plus one day
  const nextDate = new Date(dateOne);
  nextDate.setDate(nextDate.getDate() + 1);
  const [dateTwo, setDateTwo] = useState(nextDate);
  const { userStatus } = useContext(UserContext);
  const { uid } = userStatus
  const [activeGrafico, setActiveGrafico] = useState(false)
  const [graphKey, setGraphKey] = useState(0)

  const onSubmit = async (data) => {
    setError(null);
    //format dates received from datePick usestate hook
    const formattedDateOne = format(dateOne, "dd/MM/yyyy");
    const formattedDateTwo = format(dateTwo, "dd/MM/yyyy");
    //join dates as per API format requirement
    const fechas = `${formattedDateOne}-${formattedDateTwo}`;
    //add to data object

    const newData = {
      ...data,
      accommodates: parseInt(data.accommodates, 10),
      bedrooms: parseInt(data.bedrooms, 10),
      beds: parseInt(data.beds, 10),
      Grouped_reviews: parseInt(data.Grouped_reviews, 10),
      num_bathrooms: parseInt(data.num_bathrooms, 10),
      fechas,
    };

    setFormData(newData);
    setIsLoading(true);
    setActiveGrafico(true)

    try {
      const response = await dataFetch(
        "https://proxyapidesafio.onrender.com/api1/predict",
        "POST",
        newData
      );

      //Manejando respuesta
      if (response.ok) {

        setData(response.data);
        setGraphKey(graphKey + 1)

        const precioMinimo = response.data.precio_minimo_estancia;
        const precioMaximo = response.data.precio_maximo_estancia;
        const precioMinimoDia = response.data.precio_minimo_por_dia;
        const precioMaximoDia = response.data.precio_maximo_por_dia;

        const body = {
          ...data,
          precio_minimo_estancia: precioMinimo,
          precio_maximo_estancia: precioMaximo,
          precio_minimo_por_dia: precioMinimoDia,
          precio_maximo_por_dia: precioMaximoDia,
          uid: uid,
          estanc: "corta"
        }

        const user = await dataFetch("https://trip-jun-bridge-back.onrender.com/api/v1/consulta/crearcorta", 'POST', body)

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
    Chamartín: [
      "Hispanoamérica",
      "Prosperidad",
      "Castilla",
      "El Viso",
      "Nueva España",
      "Ciudad Jardín",
    ],
    Latina: [
      "Cármenes",
      "Puerta del Angel",
      "Lucero",
      "Aluche",
      "Campamento",
      "Aguilas",
      "Cuatro Vientos",
    ],
    Arganzuela: [
      "Legazpi",
      "Palos de Moguer",
      "Chopera",
      "Acacias",
      "Delicias",
      "Imperial",
      "Atocha",
    ],
    Centro: [
      "Sol",
      "Embajadores",
      "Justicia",
      "Universidad",
      "Palacio",
      "Cortes",
    ],
    Salamanca: [
      "Recoletos",
      "Goya",
      "Castellana",
      "Lista",
      "Fuente del Berro",
      "Guindalera",
    ],
    "Fuencarral - El Pardo": [
      "Valverde",
      "La Paz",
      "Mirasierra",
      "Peñagrande",
      "Pilar",
      "El Goloso",
      "El Pardo",
      "Fuentelareina",
    ],
    "Ciudad Lineal": [
      "Pueblo Nuevo",
      "Costillares",
      "Concepción",
      "Ventas",
      "San Juan Bautista",
      "Quintana",
      "San Pascual",
      "Colina",
    ],
    "Moncloa - Aravaca": [
      "Argüelles",
      "Ciudad Universitaria",
      "Valdezarza",
      "Casa de Campo",
      "Aravaca",
      "Valdemarín",
      "El Plantío",
    ],
    Chamberí: [
      "Almagro",
      "Rios Rosas",
      "Trafalgar",
      "Arapiles",
      "Gaztambide",
      "Vallehermoso",
    ],
    "San Blas - Canillejas": [
      "Arcos",
      "Simancas",
      "Salvador",
      "Rejas",
      "Rosas",
      "Canillejas",
      "Hellín",
      "Amposta",
    ],
    Retiro: [
      "Pacífico",
      "Ibiza",
      "Jerónimos",
      "Niño Jesús",
      "Adelfas",
      "Estrella",
    ],
    Villaverde: [
      "Los Angeles",
      "San Andrés",
      "Los Rosales",
      "Butarque",
      "San Cristobal",
    ],
    Barajas: [
      "Timón",
      "Casco Histórico de Barajas",
      "Alameda de Osuna",
      "Aeropuerto",
      "Corralejos",
    ],
    Hortaleza: [
      "Canillas",
      "Piovera",
      "Valdefuentes",
      "Pinar del Rey",
      "Apostol Santiago",
      "Palomas",
    ],
    "Puente de Vallecas": [
      "Numancia",
      "San Diego",
      "Palomeras Sureste",
      "Palomeras Bajas",
      "Portazgo",
      "Entrevías",
    ],
    Usera: [
      "San Fermín",
      "Moscardó",
      "Zofío",
      "Almendrales",
      "Orcasur",
      "Orcasitas",
      "Pradolongo",
    ],
    Carabanchel: [
      "Comillas",
      "Opañel",
      "Puerta Bonita",
      "San Isidro",
      "Vista Alegre",
      "Abrantes",
      "Buenavista",
    ],
    Moratalaz: [
      "Marroquina",
      "Fontarrón",
      "Vinateros",
      "Media Legua",
      "Pavones",
      "Horcajo",
    ],
    Tetuán: [
      "Berruguete",
      "Almenara",
      "Castillejos",
      "Cuatro Caminos",
      "Bellas Vistas",
      "Valdeacederas",
    ],
    "Villa de Vallecas": ["Casco Histórico de Vallecas", "Santa Eugenia"],
    Vicálvaro: ["Casco Histórico de Vicálvaro", "Ambroz"],
  };

  return (
    <>
      <div className="flex flex-wrap justify-center space-y-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-6 rounded-lg shadow-md space-y-3 h-full max-w-xl w-full  m-4"
        >
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
            <label className="font-semibold" htmlFor="neighbourhood_encoded">
              Barrio
            </label>
            <select
              id="neighbourhood_encoded"
              {...register("neighbourhood_encoded", {
                required: "Por favor, selecione un barrio.",
              })}
              className={`p-2 border rounded-md bg-white ${errors.neighbourhood_encoded ? "border-red-500" : ""
                }`}
            >
              <option value="" selected disabled>Seleccione barrio</option>
              {selectedDistrito &&
                distritosBairros[selectedDistrito].map((bairro) => (
                  <option key={bairro} value={bairro}>
                    {bairro}
                  </option>
                ))}
            </select>
            {errors.neighbourhood_encoded && (
              <span className="text-xs text-red-500">
                {errors.neighbourhood_encoded.message}
              </span>
            )}
          </div>

          {/* TIPO DE HABITACION */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="room_type_encoded" className="font-semibold">Tipo de Vivienda</label>
            <select {...register("room_type_encoded", { required: true })}
              className={`p-2 border rounded-md bg-white ${errors.room_type_encoded ? "border-red-500" : ""
                }`}>
              <option value="" selected disabled>Seleccione tipo de vivienda</option>
              <option value="Private room">Habitación Privada</option>
              <option value="Entire home/apt">Casa/ Piso completo</option>
              <option value="Shared room">Habitación Compartida</option>
            </select>
          </div>

          {/* CAPACIDAD del ALOJAMIENTO */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="accommodates" className="font-semibold">
              Número de huespedes
            </label>
            <input
              {...register("accommodates", {
                required: "Necesitamos saber la capacidad del alojamiento",
                min: 1,
              })}
              type="number"
              name="accommodates"
              className="p-2 border rounded-md"
            />
            {errors.accommodates && (
              <span className="text-xs text-red-500">
                {errors.accommodates.message}
              </span>
            )}
          </div>

          {/* HABITACIONES */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="bedrooms" className="font-semibold">
              Número de habitaciones
            </label>
            <input
              {...register("bedrooms", {
                required: "Necesitamos saber el número de habitaciones",
                min: 1,
              })}
              type="number"
              name="bedrooms"
              className="p-2 border rounded-md"
            />
            {errors.bedrooms && (
              <span className="text-xs text-red-500">
                {errors.bedrooms.message}
              </span>
            )}
          </div>

          {/* CAMAS */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="beds" className="font-semibold">
              Número de Camas
            </label>
            <input
              {...register("beds", {
                required: "Necesitamos saber el número de habitaciones",
                min: 1,
              })}
              type="number"
              name="beds"
              className="p-2 border rounded-md"
            />
            {errors.beds && (
              <span className="text-xs text-red-500">
                {errors.beds.message}
              </span>
            )}
          </div>

          {/* BAÑOS */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="num_bathrooms" className="font-semibold">Número de Baños</label>
            <input
              {...register("num_bathrooms", {
                required: "Necesitamos saber el número de baños",
                min: 1,
              })}
              type="number"
              name="num_bathrooms"
              className="p-2 border rounded-md"
            />
            {errors.num_bathrooms && (
              <span className="text-xs text-red-500">
                {errors.num_bathrooms.message}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row">
            <DayPick
              setDate={setDateOne}
              date={dateOne}
              label={"Fecha de inicio"}
            />
            <DayPick
              setDate={setDateTwo}
              date={dateTwo}
              label={"Fecha de Salida"}
            />
          </div>

          {/* REVIEWS */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="Grouped_reviews" className="font-semibold">Indique la evaluación del anuncio</label>
            <input
              {...register("Grouped_reviews", {
                required: "Indique la valoración del anuncio",
                max: 5,
              })}
              type="number"
              name="Grouped_reviews"
              className="p-2 border rounded-md"
            />
            {errors.Grouped_reviews && (
              <span className="text-xs text-red-500">
                {errors.Grouped_reviews.message}
              </span>
            )}
          </div>

          <input
            type="submit"
            value="Enviar"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300"
          />
        </form>

        {data && !isLoading && (
          <div className="max-w-xl m-4 ">
            <div className="flex flex-col justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
              <p className="text-3xl font-semibold text-gray-800 mb-4">
                ¡Gracias por su consulta!
              </p>
              <p className="text-lg text-gray-800">
                Según su búsqueda, los precios estimados son los siguientes:
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-xl font-bold text-green-800 mb-2">
                    Precio mínimo por día
                  </p>
                  <p className="text-3xl font-bold text-green-800">
                    €{data.precio_minimo_por_dia}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-xl font-bold text-green-800 mb-2">
                    Precio máximo por día
                  </p>
                  <p className="text-3xl font-bold text-green-800">
                    €{data.precio_maximo_por_dia}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-xl font-bold text-blue-800 mb-2">
                    Precio mínimo de estancia
                  </p>
                  <p className="text-3xl font-bold text-blue-800">
                    €{data.precio_minimo_estancia}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-xl font-bold text-blue-800 mb-2">
                    Precio máximo de estancia
                  </p>
                  <p className="text-3xl font-bold text-blue-800">
                    €{data.precio_maximo_estancia}
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-800 mt-6">
                ¡Esperamos que esta información le sea útil!
              </p>
            </div>
          </div>
        )}

        {/* Verifica si está cargando para mostrar spinner de loading */}
        {isLoading && (
          <div className="max-w-xl m-4 ">
            <div className="flex flex-col justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
              <p>Cargando...</p>
            </div>
          </div>
        )}

        {/* Manejo de errores para mostrar en cada caso */}
        {error && (
          <div className="max-w-xl m-4 ">
            <div className="flex flex-col justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
              <p>Error: {error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Grafico de Historial*/}
      <div className=" px-4 h-[500px] my-4">
        {activeGrafico && (
          <>
          <p className="text-xl font-semibold text-gray-800 mb-4 text-center">Historial de Consultas</p>
            <div className="p-6 bg-gray-100 w-full rounded-lg shadow-md h-full mx-auto max-w-6xl wGrafica">              
              <GraphicsCorto key={graphKey} />
            </div>
          </>
        )}
      </div>
    </>
  );
};