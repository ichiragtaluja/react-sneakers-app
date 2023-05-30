import "./App.css";
import { Header } from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { NavRoutes } from "./routes/NavRoutes";
import { useUserData } from "./contexts/UserDataProvider";
import { SyncLoader } from "react-spinners";

function App() {
  const { loading } = useUserData();

  const override = {
    position: "absolute",
    top: "50vh",
    left: "50vw",
  };
  return (
    <div className="App">
      <Header />
      {loading && (
        <SyncLoader cssOverride={override} loading={loading} color="black" />
      )}
      <NavRoutes />
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: "6rem",
        }}
      />
    </div>
  );
}

export default App;
