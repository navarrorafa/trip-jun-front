import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

/**
 * Función que administra los datos de acceso
 */
export const AccessForm = ({ logregUser, alreadyUser }) => {
  // Manejadores de estado
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

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
/**
   * Función almacena el nombre de usuario en el localStorage para mostrar saludo sin hacer reload
   */
  const saveLocal = (ev) => {
    const saveName = ev.target.value;
    localStorage.setItem("saveName", JSON.stringify(saveName));
  };

  return (
    <>
      <form
        className="bg-gray-100 p-6 rounded-lg shadow-md space-y-3 h-full max-w-xl mx-5 md:m-auto block mt-10 md:mt-16"
        onSubmit={handleSubmit((data) => logregUser(data))}
      >
        {!alreadyUser &&
          <>
            <label
              htmlFor="name"
              className="text-lg md:text-xl tracking-wide"
            >
              Nombre
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              name="name"
              onChange={saveLocal}
              className="flex flex-col space-y-2 p-2 rounded-lg w-full"
            />
          </>
        }
        <label htmlFor="email" className="text-lg md:text-xl tracking-wide">
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
          className="flex flex-col space-y-2 p-2 rounded-lg w-full"
        />
        <p className="text-red-500">{errors.email?.message}</p>
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
        {alreadyUser &&
          <Link className='underline text-blue-600 hover:text-green-500' to='/recover' >Olvidaste la contraseña?</Link>
        }
        <p className="text-red-500">{errors.password?.message}</p>
        {!alreadyUser &&
          <>
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
          </>
        }
        <button
          className=" w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </>
  );
};
