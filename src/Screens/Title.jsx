import { useNavigate } from 'react-router-dom'

function Title() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>This is the front page</h1>
            <p>Display the Gypsy lady here</p>
            <button onClick={() => navigate('/Screens/TypeSelect')}>Type Select</button>
        </div>
    )
}

export default Title
