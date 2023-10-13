import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { dataFetch } from '../../helpers/dataFetch';

export const ConsultaForm = () => {
    const { register,reset, handleSubmit, formState: { errors } } = useForm();
    const [formData, setFormData] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    

    const onSubmit = async (data) => {
        setFormData(data); 
        setIsLoading(true);
    
        try {
            const response = await dataFetch("http://127.0.0.1:3500/api/predict", 'POST', data);
            
            //Manejando respuesta
            if(response.ok){
                setData(response.data);
                console.log('Response from server:', response.data);
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
            
            <div className="flex-1">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-6 rounded-lg shadow-md space-y-3 h-full">
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
                        {errors.banos && <span>{errors.banos.message}</span>}
                    </div>

                    {/* AREA M2 */}
                    <div className="flex flex-col space-y-2">
                        <label>Indique la area m2</label>
                        <input
                            {...register("area", { required: "Necesitamos conocer el número de baños", min: 1 })}
                            type="number"
                            name="area"
                        />
                        {errors.area && <span>{errors.area.message}</span>}
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
                    {errors.furnished && <span>{errors.furnished.message}</span>}



                    <input
                        type="submit"
                        value="Enviar"
                        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300"
                    />
                
                 
                </form>
            </div >
            </div >


            {data && !isLoading && (
    <div className="w-full md:w-auto">
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
            <p>Prediction: {data.prediction}</p>
        </div>
    </div>
)}

{/* Verifica se está carregando para exibir um loading spinner ou mensagem */}
{isLoading && (
    <div className="w-full md:w-auto">
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
            <p>Carregando...</p>
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




        </>
    )
}