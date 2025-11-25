import './styles.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Title from "./Screens/Title";
import TypeSelect from "./Screens/TypeSelect";
import FateReading from "./Screens/FateReading";
import LazySusan from "./Screens/LazySusan";
import NavBar from "./Components/NavBar";

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <NavBar />

        <main className="screen-container">
          <Routes>
            <Route path="/" element={<Title />} />
            <Route path="/Screens/TypeSelect" element={<TypeSelect />} />
            <Route path="/Screens/FateReading" element={<FateReading />} />
            <Route path="/Screens/LazySusan" element={<LazySusan />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}