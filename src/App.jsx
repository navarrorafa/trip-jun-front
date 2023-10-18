import { NavBar } from "./components/NavBar";
import { AppRouter } from "./routes/AppRouter";
import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <>
      <UserProvider>
        <header className="p-5 bg-gray-800">
          <NavBar />
        </header>
        <main>
          <AppRouter />
        </main>
        <footer className="p-4 bg-gray-800">
            <p className="text-white text-center"> © <strong><span className="text-red-500">Mad</span>Bridge:</strong> Rental Predicts. 2023 Copyright.</p>
        </footer>
      </UserProvider>
    </>
  );
};

export default App;
