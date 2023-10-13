import { auth } from "../config/firebaseConfig";
import googleLogo from "../../assets/google.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

/**
 * Función que retorna componente botón con onClick donde la funcion de googleLogin es llamada
 */
export const GoogleLoginButton = () => {
  const provider = new GoogleAuthProvider();

  /**
   * Función hace uso del metodo nativo de Firebase signInWithPopup y declara variables para iniciar sesión con cuenta Google
   */
  const googleLogin = async () => {
    try {
      const resp = await signInWithPopup(auth, provider);
      const credentials = await GoogleAuthProvider.credentialFromResult(resp);
    } catch (error) {
      // Manejo de errores para admin.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credentials = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credentials);
    }
  };

  return (
    <button className="m-auto block" onClick={googleLogin}>
      <img className="" src={googleLogo} alt="google logo" />
    </button>
  );
};
