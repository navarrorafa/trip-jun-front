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
          <button className="" onClick={logOut}>Logout</button>         
      </>
    );
  };