import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AccessForm } from "../components/AccessForm";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  /**
   * Función hace uso del metodo nativo de Firebase createUserWithEmailAndPassword para creación de cuenta de usuario con los datos proporcionados en el form
   */
  const logregUser = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/"); //aun por determinar la ruta hacia usuario logeado
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrors("Ya existe una cuenta con ese email");
      } else if (error.code === "auth/invalid-email") {
        setErrors("Email no válido");
      } else if (error.code === "auth/weak-password") {
        setErrors("La contraseña es muy débil");
      } else if (error.code) {
        setErrors("Error de registro, contacte con el Admin");
        console.log("Error de registro:", error);
      }
    }
  };

  return (
    <>
      <section className="pb-20">
        <h1 className="text-2xl md:text-3xl text-center tracking-wide pt-10 md:pt-16">
          Bienvenido!
        </h1>
        <article>
          <AccessForm logregUser={logregUser} alreadyUser={false} />
        </article>
        <p className="my-6 text-red-500 md:text-lg text-center">{errors}</p>
        <article className=" border-t m-5 md:m-auto max-w-2xl border-gray-500">
          <p className="mt-6 mb-4 text-lg md:text-xl font-light text-center">
            Regístrate con
          </p>
          <GoogleLoginButton />
          <p className="mt-6 mb-4 text-lg md:text-xl font-light text-center">
            O si ya tienes una cuenta,{" "}
            <Link
              to="/login"
              className="font-bold underline hover:text-blue-950"
            >
              inicia sesión.
            </Link>
          </p>
        </article>
      </section>
    </>
  );
};
