import { useNavigate } from 'react-router-dom'

function LazySusan() {
    const navigate = useNavigate()

  return (
    <div>
        <h2>Lazy Susan</h2>
        <p>Spinny card thing here</p>
        <button onClick={() => navigate('/TypeSelect')}>Type Select</button>
    </div>
  )
}

export default LazySusan
