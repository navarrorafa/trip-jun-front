// Importa las funciones necesarias desde el SDK de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// Configuracion web de la app de Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MSG_SENDER_ID,
    appId: import.meta.env.VITE_APP_API_ID
};

// Inicialización Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Exporta la instancia de autenticacion donde se necesite
export const auth = getAuth(firebaseApp);