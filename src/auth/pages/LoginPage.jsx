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
      navigate("/"); //aun por determinar la ruta hacia usuario logeado
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
      <section className="">
        <h1 className="">
          Bienvenido!
        </h1>
        <article>
          <AccessForm logregUser={logregUser} alreadyUser={true} />
          <p className="">
            {errors}
          </p>
        </article>
        <article className="">
          <p className="">
            Iniciar sesión con
          </p>
          <GoogleLoginButton />
          <p className="">
            O si lo prefieres,{" "}
            <Link
              to="/register"
              className=""
            >
              regístrate.
            </Link>
          </p>
        </article>
      </section>
    </>
  );
};