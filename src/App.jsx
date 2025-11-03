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
        <Route path="/" element={<Title />} />
        <Route path="/typeselect" element={<TypeSelect />} />
        <Route path="/fatereading" element={<FateReading />} />
        <Route path="/lazysusan" element={<LazySusan />} />
      </Routes>
    </Router>
  )
}

export default App
