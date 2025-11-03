import './styles.css'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import Title from './Screens/Title'
import TypeSelect from './Screens/TypeSelect'
import FateReading from './Screens/FateReading'
import LazySusan from './Screens/LazySusan'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Title" element={<Title />} />
        <Route path="/TypeSelect" element={<TypeSelect />} />
        <Route path="/FateReading" element={<FateReading />} />
        <Route path="/LazySusan" element={<LazySusan />} />
      </Routes>
    </Router>
  )
}

export default App
