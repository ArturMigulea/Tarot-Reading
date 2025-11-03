import { useNavigate } from 'react-router-dom'

function FateReading() {
    const navigate = useNavigate()

  return (
    <div>
        <h2>Fate Reading</h2>
        <button onClick={() => navigate('/LazySusan')}>Next</button>
        <button onClick={() => navigate('/TypeSelect')}>Type Select</button>
    </div>
  )
}

export default FateReading
