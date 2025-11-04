import { useNavigate, useLocation } from 'react-router-dom'

function FateReading() {
    const navigate = useNavigate();
    
    const location = useLocation();
    const { question, cardAmount } = location.state || {}; // safely extract the passed data

    return (
        <div>
            <h2>Fate Reading</h2>

            <div>
                <h2>Your Question:</h2>
                <p>{question || 'No question provided.'}</p>
            </div>
            <div>
                <h2>Card Amount:</h2>
                <p>{cardAmount || 'No amount provided.'}</p>
            </div>

            <button onClick={() => navigate('/Screens/LazySusan')}>Next</button>
            <button onClick={() => navigate('/Screens/TypeSelect')}>Type Select</button>
        </div>
    )
}

export default FateReading
