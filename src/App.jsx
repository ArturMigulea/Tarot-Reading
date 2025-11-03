import './styles.css'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import Title from './Screens/Title'
import TypeSelect from './Screens/TypeSelect'
import FateReading from './Screens/FateReading'
import LazySusan from './Screens/LazySusan'

function App() {
  return (
    <>
      <Router>
        <div>
          <Link to="/Screens/">home</Link>
          <Link to="/Screens/Title">title</Link>
          <Link to="/Screens/TypeSelect">users</Link>
          <Link to="/Screens/FateReading">title</Link>
          <Link to="/Screens/LazySusan">users</Link>
        </div>

        <Routes>
          <Route path="/Screens/Title" element={<Title />} />
          <Route path="/Screens/TypeSelect" element={<TypeSelect />} />
          <Route path="/Screens/FateReading" element={<FateReading />} />
          <Route path="/Screens/LazySusan" element={<LazySusan />} />
          <Route path="/Screens/" element={<TypeSelect />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
