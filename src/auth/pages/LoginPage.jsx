import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AccessForm } from "../components/AccessForm";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  /**
   * Función hace uso del metodo nativo de Firebase signInWithEmailAndpassword para autenticación con los datos proporcionados en el form
   */
  const logregUser = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setErrors("Usuario y/o contraseña incorrectos");
      } else {
        setErrors("Error de inicio de sesión, contacte con el Admin");
        console.log("Error de inicio de sesión:", error);
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
          <AccessForm logregUser={logregUser} alreadyUser={true} />
          <p className="my-6 text-red-500 md:text-lg text-center">{errors}</p>
        </article>
        <article className="border-t m-5 md:m-auto max-w-2xl border-gray-500">
          <p className="mt-6 mb-4 text-lg md:text-xl font-light text-center">
            Iniciar sesión con
          </p>
          <GoogleLoginButton />
          <p className="mt-6 mb-4 text-lg md:text-xl font-light text-center">
            O si lo prefieres,{" "}
            <Link
              to="/register"
              className="font-bold underline hover:text-blue-950"
            >
              regístrate.
            </Link>
          </p>
        </article>
      </section>
    </>
  );
};
