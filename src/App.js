import "./App.css";
import { Header } from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { NavRoutes } from "./routes/NavRoutes";
import { SyncLoader } from "react-spinners";
import { useData } from "./contexts/DataProvider";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";

function App() {
  const { loading } = useData();

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
      <ScrollToTop />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: { duration: 1500 },
          error: { duration: 1500 },
        }}
        containerStyle={{
          top: "6rem",
        }}
      />
    </div>
  );
}

export default App;
