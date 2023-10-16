import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export const RecoverPage = () => {
    const [errors, setErrors] = useState("");
    const [sentEmail, setSentEmail] = useState(false);

    /**
     * Función hace uso del metodo nativo de Firebase sendPasswordResetEmail para iniciar el proceso de recuperación de contraseña
     */
    const recoverPassword = async (data) => {
        try {
            await sendPasswordResetEmail(auth, data.email);
            setSentEmail(true)
            // navigate("/login");
        } catch (error) {
            if (
                error.code === "auth/invalid-email" ||
                error.code === "auth/user-not-found"
            ) {
                setErrors("No hay cuenta asociada a ese email, prueba de nuevo");
            } else {
                setErrors("Error de recuperación, contacte con el Admin");
                console.log("Error de recuperación:", error);
            }
        }
    };

    // Importa del useform de react-hook-form las variables para capturar y validar datos
    const {
        register,
        handleSubmit,
    } = useForm({ mode: "all" });

    return (
        <>
            <section className="pb-20">
                <h1 className="text-2xl md:text-3xl text-center tracking-wide pt-10 md:pt-16">
                    Bienvenido!
                </h1>
                {!sentEmail ?
                    <article>
                        <form
                            className="bg-gray-100 p-6 rounded-lg shadow-md space-y-3 h-full max-w-xl mx-5 md:m-auto block mt-10 md:mt-16"
                            onSubmit={handleSubmit((data) => recoverPassword(data))}
                        >
                            <label htmlFor="email" className="text-lg md:text-xl tracking-wide">
                                Restablece tu contraseña
                            </label>
                            <p>Introduce el email vinculado a tu cuenta. Allí recibirás un enlace para restablecer la contraseña.</p>
                            <input
                                {...register("email", {
                                    required: "Inserte su email",
                                    minLength: {
                                        value: 5,
                                        message: "Inserte un email válido",
                                    },
                                })}
                                type="text"
                                id="email"
                                name="email"
                                className="flex flex-col space-y-2 p-2 rounded-lg w-full"
                            />
                            <p className="text-red-500">{errors?.message}</p>
                            <button
                                className=" w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
                                type="submit"
                            >
                                Restablecer tu contraseña
                            </button>
                        </form>
                    </article> :
                    <article className="bg-gray-100 p-6 rounded-lg shadow-md space-y-3 h-full max-w-xl mx-5 md:m-auto block mt-10 md:mt-16">
                        <h2 className="text-lg md:text-xl tracking-wide">Email enviado!</h2>
                        <p>Revisa tu correo y sigue las instrucciones.</p>
                        <p>No has recibido nada?{" "}
                             <Link to="/contact"
                                className="font-bold underline hover:text-blue-950"
                            >Contáctanos.</Link>
                        </p>
                    </article>}

            </section>
        </>
    );
};