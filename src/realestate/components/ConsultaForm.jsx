import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Graphics } from "./Graphics";
import { useFetch } from "../../hook/useFetch";
import { HeatMap } from "./HeatMap";
export const ConsultaForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-6 rounded-lg shadow-md space-y-3 h-full"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="tipoEstancia">Tipo de estancia</label>
            <select {...register("tipoEstancia", { required: true })}>
              <option> ------- </option>
              <option value=" estanciaCorta"> estancia corta (un mes)</option>
              <option value=" estanciaLarga">
                {" "}
                estancia larga (de un mes a un año)
              </option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label>Indique el barrio por favor</label>
            <input
              {...register("ubicacion", {
                required: "La ubicación es obligatoria",
              })}
              type="text"
              name="ubicacion"
            />
            {errors.ubicacion && <span>{errors.ubicacion.message}</span>}
          </div>
          <div className="flex flex-col space-y-2">
            <label>Indique la superficie en metros cuadrados</label>
            <input
              {...register("metros", {
                required: "Necesitamos conocer la superficie de la vivienda",
                min: 1,
              })}
              type="number"
              name="metros"
            />
            {errors.metros && <span>{errors.metros.message}</span>}
          </div>
          <div className="flex flex-col space-y-2">
            <label>Indique el número de habitaciones</label>
            <input
              {...register("numeroHabitaciones", {
                required: "Necesitamos conocer el número de habitaciones",
                min: 1,
              })}
              type="number"
              name="numeroHabitaciones"
            />
            {errors.numeroHabitaciones && (
              <span>{errors.numeroHabitaciones.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label>¿El edificio dispone de ascensor?</label>
          </div>
          <label>Sí </label>
          <input
            {...register("ascensor", {
              required:
                "Por favor, indique si dispone de asccensor en el edificio",
            })}
            type="radio"
            name="ascensor"
            value="si"
          />
          <label>No </label>
          <input
            {...register("ascensor", {
              required:
                "Por favor, indique si dispone de ascensor en el edificio",
            })}
            type="radio"
            name="ascensor"
            value="no"
          />
          {errors.ascensor && <span>{errors.ascensor.message}</span>}
          <div className="flex flex-col space-y-2">
            <label>¿Hay aire acondicionado en la vivienda?</label>
          </div>
          <label>Sí </label>
          <input
            {...register("aireAcondicionado", {
              required: "Por favor, indique si dispone de aire acondicionado",
            })}
            type="radio"
            name="aireAcondicionado"
            value="si"
          />
          <label>No </label>
          <input
            {...register("aireAcondicionado", {
              required: "Por favor, indique si dispone de aire acondicionado",
            })}
            type="radio"
            name="aireAcondicionado"
            value="no"
          />
          {errors.aireAcondicionado && (
            <span>{errors.aireAcondicionado.message}</span>
          )}
          <div className="flex flex-col space-y-2">
            <input
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300"
            />
          </div>

          <div className=" grid grid-cols-2  ">
            <div>
              <h5 className="card-title h5 h4-sm mt-3 text-center">
                Predicción de precios
              </h5>
              <a
                href="#"
                className="flex flex-col space-y-2 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300"
              >
                Máximo
              </a>
              <a
                href="#"
                className="flex flex-col space-y-2 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300"
              >
                Mínimo
              </a>
            </div>
            <div>
              <Graphics />
            </div>
          </div>
          <div>
            <div>
              <HeatMap />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
