import { useNavigate } from 'react-router-dom'

import MultiUseButton from "../Components/MultiUseButton";

function LazySusan() {
    const navigate = useNavigate()

    return (
        <div>
            <h2>Lazy Susan</h2>
            <p>Spinny card thing here</p>
            {/* <button onClick={() => navigate('/Screens/TypeSelect')}>Type Select</button> */}

            <MultiUseButton
                buttons={[
                    {
                        label: "Type Select",
                        onClick: () => navigate('/Screens/TypeSelect')
                    }
                ]}
            />
        </div>
    )
}

export default LazySusan
