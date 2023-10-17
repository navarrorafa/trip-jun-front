import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../auth/config/firebaseConfig";
import { deleteUser } from "firebase/auth"


export const DeleteAccPage = () => {
    const [errors, setErrors] = useState("");
    const navigate = useNavigate()
    /**
     * Función hace uso del metodo deleteUser para borrar una cuenta de usuario
     */
    const deletear = async () => {
        const user = auth.currentUser;
        try {
            await deleteUser(user);
            navigate("/home");
            window.location.reload();
        } catch (error) {
            if (error.code === "auth/requires-recent-login") {
                setErrors("Inicie sesión de nuevo y vuelva a intentarlo");
            } else {
                setErrors("Error al borrar su cuenta, contacte con el Admin");
                console.log("Error:", error);
            };
        };
    };
    return (
        <>
            <section className="pb-20">
                <h1 className="text-2xl md:text-3xl text-center tracking-wide pt-10 md:pt-16">
                    Atención!
                </h1>
                <article className="bg-gray-100 p-6 rounded-lg shadow-md space-y-3 h-full max-w-xl mx-5 md:m-auto block mt-10 md:mt-16">
                    <h2 className="text-lg md:text-xl tracking-wide">Este paso es irreversible.</h2>
                    <p>Te lo has pensado mejor?{" "}
                        <Link to="/home"
                            className="font-bold underline hover:text-blue-950"
                        >Sigue haciendo consultas.</Link>
                    </p>
                    <p>Si pulsas el botón rojo eliminarás tu cuenta sin vuelta atrás.</p>
                    <button className='w-full p-3 text-white bg-red-500 rounded-full hover:bg-red-700 transition-all duration-300' onClick={deletear}>Borrar cuenta definitivamente</button>
                    <p className="my-6 text-red-500 md:text-lg text-center">{errors}</p>
                </article>
            </section>
        </>
    );
};

