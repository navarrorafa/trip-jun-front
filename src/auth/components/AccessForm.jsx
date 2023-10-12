import { useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Función que administra los datos de acceso
 */
export const AccessForm = ({ logregUser, alreadyUser }) => {
    // Manejadores de estado
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
  
    // Importa del useform de react-hook-form las variables para capturar y validar datos
    const {
      register,
      formState: { errors },
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
        <form
          className=""
          onSubmit={handleSubmit((data) => logregUser(data))}
        >
          <label
            htmlFor="email"
            className=""
          >
            Email
          </label>
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
            className=""
          />
          <p className="">
            {errors.email?.message}
          </p>
          <label
            htmlFor="password"
            className=""
          >
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
            className=""
          />
          <p className="">
            {errors.password?.message}
          </p>
          {!alreadyUser && (
            <>
              <label
                htmlFor="passwordConfirm"
                className=""
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
                className=""
                onChange={comparePasswords}
              />
              <p className="">
                {errors.passwordConfirm?.message}
              </p>
              <p className="">{passwordMatch}</p>
            </>
          )}
          <button
            className=""
            type="submit"
          >
            Login
          </button>
        </form>
      </>
    );
  };