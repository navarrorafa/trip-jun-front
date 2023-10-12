import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

/**
 * Función que retorna componente botón con onClick donde la funcion de logOut es llamada
 */
export const LogoutButton = () => {
  const navigate = useNavigate();

  /**
   * Función hace uso del metodo nativo de firebase signOut y navega a pagina inicial
   */
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        className="px-4 py-1 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg"
        onClick={logOut}
      >Logout</button>
    </>
  );
};