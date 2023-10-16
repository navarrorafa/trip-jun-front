import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AccessForm } from "../components/AccessForm";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  /**
   * Función hace uso del método nativo de Firebase createUserWithEmailAndPassword para creación de cuenta de usuario con los datos proporcionados en el form
   */
  const logregUser = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      //Adicionalmente hace uso del método nativo de Firebase updateProfile para definir el valor de displayName con el nombre aportado por el usuario o si éste se envia en blanco, con el email excluyendo el @dominio
      if (data.name) {
        await updateProfile(auth.currentUser, { displayName: data.name });
      } else {
        const nameArray = data.email.split("@");
        const newName = nameArray[0];
        const displayName = newName;
        await updateProfile(auth.currentUser, { displayName });
      };
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
    };
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
        <article className=" border-t m-5 md:m-auto max-w-xl border-gray-500">
          <p className="mt-6 mb-4 text-lg md:text-xl font-light text-center">
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
