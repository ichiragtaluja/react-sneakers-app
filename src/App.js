import "./App.css";
import { Header } from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { NavRoutes } from "./routes/NavRoutes";
import { useData } from "./contexts/DataProvider";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Loader } from "./components/Loader/Loader";

function App() {
  const { loading } = useData();

  return (
    <div className="App">
      <Header />
      {loading && <Loader />}
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
