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
      <section className="">
        <h1 className="">
          Bienvenido!
        </h1>
        <article>
          <AccessForm logregUser={logregUser} alreadyUser={false} />
        </article>
        <p className="">
          {errors}
        </p>
        <article className="">
          <p className="">
            Regístrate con
          </p>
          <GoogleLoginButton />
          <p className="">
            O si ya tienes una cuenta,{" "}
            <Link
              to="/login"
              className=""
            >
              inicia sesión.
            </Link>
          </p>
        </article>
      </section>
    </>
  );
};