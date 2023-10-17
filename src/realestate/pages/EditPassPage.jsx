import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../../auth/config/firebaseConfig";
import { updatePassword } from "firebase/auth"

export const EditPassPage = () => {
    const [password, setPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState("");
    const [errors, setErrors] = useState("");
    const [edited, setEdited] = useState(false);
    const navigate = useNavigate()
    /**
     * Función hace uso del metodo nativo de Firebase updatePassword para editar contraseña
     */
    const changePass = async (data) => {
        const user = auth.currentUser
        try {
            const newPassword = data.password
            await updatePassword(user, newPassword);
            setEdited(true)
            setTimeout(() => {
                navigate("/");
              }, 2000);

        } catch (error) {
            if (error.code === "auth/weak-password") {
                setErrors("La contraseña es muy débil");
            } else if (error.code === "auth/requires-recent-login") {
                setErrors("Inicia sesión de nuevo y vuelve a intentarlo");
            } else {
                setErrors("Error al editar contraseña, contacte con el Admin");
                console.log("Error al editar contraseña:", error);
            }
        };
    };

    // Importa del useform de react-hook-form las variables para capturar y validar datos
    const {
        register,
        handleSubmit,
    } = useForm({ mode: "all" });

    /**
       * Función compara los passwords introducidos y confirma que coincidan
       */
    const comparePasswords = (ev) => {
        const confirmPassword = ev.target.value;
        if (password !== confirmPassword) {
            setPasswordMatch("Las contraseñas deben coincidir.");
        } else {
            setPasswordMatch("");
        }
    };

    return (
        <>
            <section className="pb-20">
                <h1 className="text-2xl md:text-3xl text-center tracking-wide pt-10 md:pt-16">
                    Cambio de contraseña:
                </h1>
                {edited && <p className="text-green-800 h2 text-bold mt-6 mb-4 text-lg md:text-xl font-light text-center"><strong>Contraseña editada con éxito!</strong></p>}
                <article>
                    <form
                        className="bg-gray-100 p-6 rounded-lg shadow-md space-y-3 h-full max-w-xl mx-5 md:m-auto block mt-10 md:mt-16"
                        onSubmit={handleSubmit((data) => changePass(data))}
                    >
                        <label htmlFor="password" className="text-lg md:text-xl tracking-wide">
                            Contraseña
                        </label>
                        <input
                            {...register("password", {
                                required: "Inserte la contraseña",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 cáracteres",
                                },
                            })}
                            type="password"
                            id="password"
                            name="password"
                            onChange={(ev) => setPassword(ev.target.value)}
                            className="flex flex-col space-y-2 p-2 rounded-lg w-full"
                        />
                        <p className="text-red-500">{errors.password?.message}</p>
                        <label
                            htmlFor="passwordConfirm"
                            className="text-lg md:text-xl tracking-wide"
                        >
                            Repite contraseña
                        </label>
                        <input
                            {...register("passwordConfirm", {
                                required: "Confirme la contraseña",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 cáracteres",
                                },
                            })}
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            className="flex flex-col space-y-2 p-2 rounded-lg w-full"
                            onChange={comparePasswords}
                        />
                        <p className="text-red-500">{errors.passwordConfirm?.message}</p>
                        <p className="text-red-500">{passwordMatch}</p>
                        <button
                            className=" w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
                            type="submit"
                        >
                            Editar tu contraseña
                        </button>
                    </form>
                </article>
            </section>
        </>
    )
}