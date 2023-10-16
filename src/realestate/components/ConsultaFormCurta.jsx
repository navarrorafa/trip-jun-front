import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { dataFetch } from "../../helpers/dataFetch";
import { format } from "date-fns";
import { DayPick } from "./DayPick";

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

  const onSubmit = async (data) => {
    //format dates received from datePick usestate hook
    const formattedDateOne = format(dateOne, "dd/MM/yyyy");
    const formattedDateTwo = format(dateTwo, "dd/MM/yyyy");
    //join dates as per API format requirement
    const fechas = `${formattedDateOne}-${formattedDateTwo}`;
    //add to data object
    const newData = {
      ...data,
      fechas,
    };
    console.log(newData);
    setFormData(newData);
    setIsLoading(true);

    try {
      const response = await dataFetch(
        "http://16.171.25.32/api/predict",
        "POST",
        newData
      );

      //Manejando respuesta
      if (response.ok) {
        setData(response.data);
        console.log("Response from server:", response.data);
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
      <div className="flex-1">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-100 p-6 rounded-lg shadow-md space-y-3 h-full"
          >
            {/* Campo de seleção de distrito */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="distrito">
                Distrito
              </label>
              <select
                id="distrito"
                {...register("distrito", {
                  required: "Por favor, selecione um distrito.",
                })}
                className={`p-2 border rounded-md ${
                  errors.distrito ? "border-red-500" : ""
                }`}
              >
                <option value=""> ------- </option>
                {Object.keys(distritosBairros).map((distrito) => (
                  <option key={distrito} value={distrito}>
                    {distrito}
                  </option>
                ))}
              </select>
              {errors.distrito && (
                <span className="text-xs text-red-500">
                  {errors.distrito.message}
                </span>
              )}
            </div>

            {/* Campo de seleção de bairro */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="subdistrito">
                Barrio
              </label>
              <select
                id="subdistrito"
                {...register("subdistrito", {
                  required: "Por favor, selecione um bairro.",
                })}
                className={`p-2 border rounded-md ${
                  errors.subdistrito ? "border-red-500" : ""
                }`}
              >
                <option value=""> ------- </option>
                {selectedDistrito &&
                  distritosBairros[selectedDistrito].map((bairro) => (
                    <option key={bairro} value={bairro}>
                      {bairro}
                    </option>
                  ))}
              </select>
              {errors.subdistrito && (
                <span className="text-xs text-red-500">
                  {errors.subdistrito.message}
                </span>
              )}
            </div>

            {/* TIPO DE HABITACION */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="room_type">Tipo de Habitación</label>
              <select {...register("room_type", { required: true })}>
                <option> ------- </option>
                <option value="Private room">Habitación Privada</option>
                <option value="Entire home/apt">Casa/ Piso completo</option>
                <option value="Shared room">Habitación Compartida</option>
              </select>
            </div>

            {/* CAPACIDADE ALOJAMIENTO */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="accomodates">
                Indique el número de huespedes
              </label>
              <input
                {...register("accomodates", {
                  required: "Necesitamos saber la capacidad del alojamiento",
                  min: 1,
                })}
                type="number"
                name="accomodates"
              />
              {errors.accomodates && (
                <span className="text-xs text-red-500">
                  {errors.accomodates.message}
                </span>
              )}
            </div>

            {/* HABITACIONES */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="bedrooms">
                Indique el número de habitaciones
              </label>
              <input
                {...register("bedrooms", {
                  required: "Necesitamos saber el número de habitaciones",
                  min: 1,
                })}
                type="number"
                name="bedrooms"
              />
              {errors.banos && (
                <span className="text-xs text-red-500">
                  {errors.banos.message}
                </span>
              )}
            </div>

            {/* BAÑOS */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="banos">Indique el número de Baños</label>
              <input
                {...register("banos", {
                  required: "Necesitamos saber el número de baños",
                  min: 1,
                })}
                type="number"
                name="banos"
              />
              {errors.banos && (
                <span className="text-xs text-red-500">
                  {errors.banos.message}
                </span>
              )}
            </div>

            {/* FECHA */}
            {/* <div className="flex flex-col space-y-2">
              <label htmlFor="fechas">
                Fechas (Formato: DD/MM/AAAA-DD/MM/AAAA)
              </label>
              <input
                type="text"
                id="fechas"
                name="fechas"
                {...register("fechas", {
                  required: "Este campo é obrigatório",
                })}
              />
              {errors.fechas && (
                <span className="text-red-500">{errors.fechas.message}</span>
              )}
            </div> */}
            <div className="flex flex-col sm:flex-row">
              <DayPick
                setDate={setDateOne}
                date={dateOne}
                label={"Indique fecha de inicio"}
              />
              <DayPick
                setDate={setDateTwo}
                date={dateTwo}
                label={"Indique fecha final"}
              />
            </div>

            <input
              type="submit"
              value="Enviar"
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300"
            />
          </form>
        </div>
      </div>

      {data && !isLoading && (
        <div className="w-full md:w-auto">
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
            <p>Predicción: {data.prediction}</p>
          </div>
        </div>
      )}

      {/* Verifica se está carregando para exibir um loading spinner ou mensagem */}
      {isLoading && (
        <div className="w-full md:w-auto">
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
            <p>Cargando...</p>
          </div>
        </div>
      )}

      {/* Verifica se existe um erro para exibir uma mensagem de erro */}
      {error && (
        <div className="w-full md:w-auto">
          <div className="flex flex-col items-center justify-center p-6 bg-red-100 rounded-lg shadow-md text-center h-full">
            <p>Error: {error}</p>
          </div>
        </div>
      )}
    </>
  );
};
