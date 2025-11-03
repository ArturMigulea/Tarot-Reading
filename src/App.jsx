import './styles.css'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

// Importing the different screens
import Title from './Screens/Title'
import TypeSelect from './Screens/TypeSelect'
// import FateReading from './Screens/FateReading'
// import LazySusan from './Screens/LazySusan'

function App() {
  return (
    // Screen Router for app navigation. Sets root URL as Github project name "Tarot-Reading"
    <Router basename="/Tarot-Reading">
      {/* The different Screens */}
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/Screens/TypeSelect" element={<TypeSelect />} />
        {/* <Route path="/Screens/FateReading" element={<FateReading />} /> */}
        {/* <Route path="/Screens/LazySusan" element={<LazySusan />} /> */}
      </Routes>
    </Router>
  )
}

export default App
