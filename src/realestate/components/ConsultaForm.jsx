import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dataFetch } from '../../helpers/dataFetch';
import { ClipLoader } from "react-spinners";
import { UserContext } from '../../context/UserContext';
import { Graphics } from './Graphics';


export const ConsultaForm = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [formData, setFormData] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { userStatus } = useContext(UserContext);
    const { uid } = userStatus
    const [activeGrafico, setActiveGrafico] = useState(false)
    const [graphKey, setGraphKey] = useState(0)





// 

    const onSubmit = async (data) => {
        setFormData(data);
        setIsLoading(true);
        setActiveGrafico(true)


        try {
            const response = await dataFetch("http://127.0.0.1:3500/api/predict", 'POST', data);
            console.log("formulario", data)
            //Manejando respuesta
            if (response.ok) {

                setData(response.data);
                setGraphKey(graphKey + 1)
                console.log('Response from server:', response.data);
                console.log(response.data.prediction)
                const precio = response.data.prediction.toString()
                console.log("PRECIO :", precio)


                const body = { ...data, prediction: precio, uid: uid, estanc: "larga", }

                console.log("body:", body)
                const user = await dataFetch("http://localhost:3000/api/v1/consulta/crear", 'POST', body)
                console.log(user)


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




    const distritosArray = [
        'Arganzuela', 'Barajas', 'Carabanchel', 'Centro', 'Chamartín',
        'Chamberí', 'Ciudad Lineal', 'Fuencarral', 'Hortaleza', 'Latina',
        'Moncloa', 'Moratalaz', 'Puente de Vallecas', 'Retiro', 'Salamanca',
        'San Blas', 'Tetuán', 'Usera', 'Vicálvaro', 'Villa de Vallecas', 'Villaverde'
    ];

    const barriosArray = [
        'Abrantes', 'Acacias', 'Adelfas', 'Alameda de Osuna', 'Almagro', 'Almenara', 'Almendrales',
        'Aluche', 'Ambroz', 'Amposta', 'Apóstol Santiago', 'Arapiles', 'Aravaca', 'Arcos',
        'Argüelles', 'Atalaya', 'Atocha', 'Bellas Vistas', 'Bernabéu - Hispanoamérica', 'Berruguete',
        'Buenavista', 'Butarque', 'Campamento', 'Canillas', 'Canillejas', 'Casa de Campo',
        'Casco Histórico de Barajas', 'Casco Histórico de Vallecas', 'Casco histórico de Vicálvaro',
        'Castellana', 'Castilla', 'Castillejos', 'Centro', 'Chamartín', 'Chamberí', 'Chopera',
        'Ciudad Jardín', 'Ciudad Universitaria', 'Colina', 'Comillas', 'Concepción',
        'Corralejos - Campo de las Naciones', 'Cortes - Huertas', 'Costillares', 'Cuatro Caminos',
        'Cuatro vientos', 'Delicias', 'El Cañaveral - Los Berrocales', 'El Pardo', 'El Viso',
        'Embajadores - Lavapiés', 'Ensanche de Vallecas - Valdecarros', 'Entrevías', 'Estrella',
        'Fontarrón', 'Fuente del Berro', 'Fuentelarreina', 'Gaztambide', 'Goya', 'Guindalera',
        'Hellín', 'Horcajo', 'Ibiza', 'Imperial', 'Jerónimos', 'Justicia - Chueca',
        'La Florida - El Plantío', 'La Paz', 'Las Tablas', 'Legazpi', 'Lista', 'Los Cármenes',
        'Los Rosales', 'Los Ángeles', 'Lucero', 'Marroquina', 'Media Legua', 'Mirasierra',
        'Montecarmelo', 'Moscardó', 'Niño Jesús', 'Nueva España', 'Nuevos Ministerios - Ríos Rosas',
        'Numancia', 'Opañel', 'Orcasitas', 'Orcasur', 'Pacífico', 'Palacio', 'Palomas',
        'Palomeras bajas', 'Palomeras sureste', 'Palos de Moguer', 'Pau de Carabanchel', 'Peñagrande',
        'Pilar', 'Pinar del Rey', 'Piovera - Conde Orgaz', 'Portazgo', 'Pradolongo', 'Prosperidad',
        'Pueblo Nuevo', 'Puerta bonita', 'Puerta del Ángel', 'Quintana', 'Recoletos', 'Rejas',
        'Rosas - Musas', 'Salvador', 'San Andrés', 'San Cristóbal', 'San Diego', 'San Fermín',
        'San Isidro', 'San Juan Bautista', 'San Pascual', 'Sanchinarro', 'Santa Eugenia', 'Simancas',
        'Sol', 'Tetuán', 'Timón', 'Trafalgar', 'Tres Olivos - Valverde', 'Universidad - Malasaña',
        'Valdeacederas', 'Valdebebas - Valdefuentes', 'Valdebernardo - Valderribas', 'Valdemarín',
        'Valdezarza', 'Vallehermoso', 'Ventas', 'Vicálvaro', 'Vinateros',
        'Virgen del Cortijo - Manoteras', 'Vista Alegre', 'Zofio', 'Águilas'
    ];


    return (
        <>

            <div className="flex flex-wrap justify-center ">


            {/* space-y-3 h-full  max-w-xl mx-auto */}

                 
                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-14 rounded-lg shadow-md space-y-3 h-full min-w-fit  m-4 ">
                    <div className="flex flex-col space-y-2">

                        {/* TIPO DE ESTANCIA */}
                        <label htmlFor="tipo">Tipo de estancia</label>
                        <select {...register("tipo", { required: true })}>
                            <option> ------- </option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Dúplex">Dúplex</option>
                            <option value="Piso">Piso</option>
                            <option value="Ático">Ático</option>
                        </select>
                    </div>


                    {/* DISTRITO */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold" htmlFor="distrito">Distrito</label>
                        <select
                            id="distrito"
                            {...register("distrito", { required: "Por favor, selecione um distrito." })}
                            className={`p-2 border rounded-md ${errors.distrito ? "border-red-500" : ""}`}
                        >
                            <option value=""> ------- </option>
                            {distritosArray.map(distrito => (
                                <option value={distrito} key={distrito}>{distrito}</option>
                            ))}
                        </select>
                        {errors.distrito && <span className="text-xs text-red-500">{errors.distrito.message}</span>}
                    </div>

                    {/* BARRIO */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold" htmlFor="barrio">Barrio</label>
                        <select
                            id="barrio"
                            {...register("barrio", { required: "Por favor, selecione um bairro." })}
                            defaultValue=""
                            className={`p-2 border rounded-md ${errors.barrio ? "border-red-500" : ""}`}
                        >
                            <option value="" disabled> ------- </option>
                            {barriosArray.map((barrio, index) => (
                                <option key={index} value={barrio}>{barrio}</option>
                            ))}
                        </select>
                        {errors.barrio && <span className="text-xs text-red-500">{errors.barrio.message}</span>}
                    </div>



                    {/* HABITACIONES */}
                    <div className="flex flex-col space-y-2">
                        <label>Indique el número de habitaciones</label>
                        <input
                            {...register("hab", { required: "Necesitamos conocer el número de habitaciones", min: 1 })}
                            type="number"
                            name="hab"
                        />
                        {errors.hab && <span>{errors.hab.message}</span>}
                    </div>

                    {/* BAÑOS */}
                    <div className="flex flex-col space-y-2">
                        <label>Indique el número de Baños</label>
                        <input
                            {...register("banos", { required: "Necesitamos conocer el número de baños", min: 1 })}
                            type="number"
                            name="banos"
                        />
                        {errors.banos && <span className="text-xs text-red-500">{errors.banos.message}</span>}
                    </div>

                    {/* AREA M2 */}
                    <div className="flex flex-col space-y-2">
                        <label>Indique la area m2</label>
                        <input
                            {...register("area", { required: "Necesitamos conocer el número de baños", min: 1 })}
                            type="number"
                            name="area"
                        />
                        {errors.area && <span className="text-xs text-red-500">{errors.area.message}</span>}
                    </div>


                    {/* AMUEBLADO */}
                    <div className="flex flex-col space-y-2">
                        <label>¿La propiedad es amueblada?</label>
                    </div>
                    <label>Sí </label>
                    <input
                        {...register("furnished", { required: "Por favor, indique si la propiedad es amueblada" })}
                        type="radio"
                        name="furnished"
                        value="1"
                    />
                    <label>No </label>
                    <input
                        {...register("furnished", { required: "Por favor, indique si la propiedad es amueblada" })}
                        type="radio"
                        name="furnished"
                        value="0"
                    />
                    {errors.furnished && <span className="text-xs text-red-500">{errors.furnished.message}</span>}

                    {/* CONDICIONES  */}

                    <div className="flex flex-col space-y-2">
                        <label>¿En que condicion se encuentra la propiedad?</label>
                    </div>
                    <label>Normal </label>
                    <input
                        {...register("condicion", { required: "Por favor, indique la condicion de la propiedad"  })}
                        type="radio"
                        name="condicion"
                        value="normal"
                    />
                    <label>Alta Calidad</label>
                    <input
                        {...register("condicion", { required: "Por favor, indique la condicion de la propiedad"  })}
                        type="radio"
                        name="condicion"
                        value="alta-calidad"
                    />
                      <label>Lujosa</label>
                      <input
                        {...register("condicion", { required: "Por favor, indique la condicion de la propiedad" })}
                        type="radio"
                        name="condicion"
                        value="lujosa"
                    />
                     {errors.condicion && <span className="text-xs text-red-500">{errors.condicion.message}</span>}



                    <input
                        type="submit"
                        value="Enviar"
                        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300"
                    />


                </form>

                {/* p-14 rounded-lg shadow-md space-y-3 h-full min-w-fit  m-4  */}

                {data && !isLoading && (
                    <div className="w-full md:w-auto m-4 ">
                        <div className="flex flex-col justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
                            <>
                                <p className="text-2xl font-semibold text-gray-800 mb-4">
                                    ¡Gracias por su consulta!
                                </p>
                                <p className="text-xl text-gray-800">
                                    Basado en su búsqueda, la predicción mensual para su estadía de larga duración es de:
                                </p>
                                <p className="text-4xl pt-4 font-bold text-green-800  mt-2">
                                    € {data.prediction}
                                </p>
                                <p className="text-xl pb-4 font-bold text-green-800 ">
                                    mensuales
                                </p>
                                <p className="pb-4 font-bold text-green-800 ">{data.fiabilidad}</p>
                                <p className="text-xl mt-4">
                                    ¡Esperamos que esta información le sea útil!
                                </p>
                            </>
                        </div>
                    </div>

                )}


                {/* Verifica se está carregando para exibir um loading spinner ou mensagem */}
                {isLoading && (
                    <div className="w-full md:w-auto ">
                        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
                            <ClipLoader
                                size={35} // Tamaño del spinner
                                loading={isLoading}
                                className="text-gray-800" // Agrega la clase de color aquí
                            />
                            <p className="mt-4 text-lg text-gray-800 font-semibold">Carregando...</p>
                        </div>
                    </div>
                )}

                {/* Verifica se existe um erro para exibir uma mensagem de erro */}
                {error && (
                    <div className="w-full md:w-auto">
                        <div className="flex flex-col items-center justify-center p-6 bg-red-100 rounded-lg shadow-md text-center h-full">
                            <p>Erro: {error}</p>
                        </div>
                    </div>
                )}

            </div>



            <div className="min-w-full px-4 h-[500px] my-4">
  {activeGrafico && (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md h-full max-w-[70%] mx-auto">
      <Graphics key={graphKey} />
    </div>
  )}
</div>

        </>
    )
}
