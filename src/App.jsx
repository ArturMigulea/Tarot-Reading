import './styles.css'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div>
          <Link to="/">home</Link>
          <Link to="/Title">title</Link>
          <Link to="/TypeSelect">users</Link>
          <Link to="/FateReading">title</Link>
          <Link to="/LazySusan">users</Link>
        </div>

        <Routes>
          <Route path="/Title" element={<Title />} />
          <Route path="/TypeSelect" element={<TypeSelect />} />
          <Route path="/FateReading" element={<FateReading />} />
          <Route path="/LazySusan" element={<LazySusan />} />
          <Route path="/" element={<TypeSelect />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
