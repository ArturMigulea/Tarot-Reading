import './styles.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Title from "./Screens/Title";
import TypeSelect from "./Screens/TypeSelect";
import FateReading from "./Screens/FateReading";
import LazySusan from "./Screens/LazySusan";
import QuestionHistory from "./Screens/QuestionHistory";

import NavBar from "./Components/NavBar";
import ProfileButton from './Components/ProfileButton';

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <ProfileButton />
        <NavBar />

        <main className="screen-container">
          <Routes>
            <Route path="/" element={<Title />} />
            <Route path="/Screens/TypeSelect" element={<TypeSelect />} />
            <Route path="/Screens/FateReading" element={<FateReading />} />
            <Route path="/Screens/LazySusan" element={<LazySusan />} />
            <Route path="/Screens/History" element={<QuestionHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}