import { useNavigate } from 'react-router-dom'

function Title() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Welcome to the App</h1>
        <button onClick={() => navigate('/Screens/TypeSelect')}>Type Select</button>
    </div>
  )
}

export default Title
