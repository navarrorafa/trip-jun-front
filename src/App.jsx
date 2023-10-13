import { NavBar } from "./components/NavBar";
import { AppRouter } from "./routes/AppRouter";
import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <AppRouter />
      </UserProvider>
    </>
  );
}

export default App;
