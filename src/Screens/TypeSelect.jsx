import { useNavigate } from 'react-router-dom'

function TypeSelect() {
  const navigate = useNavigate()

  return (
    <div>
      <h2>Select Type</h2>
      <button onClick={() => navigate('/FateReading')}>Next</button>
    </div>
  )
}

export default TypeSelect
