import { useNavigate } from 'react-router-dom'

import MultiUseButton from "../Components/MultiUseButton";

function LazySusan() {
    const navigate = useNavigate()

    return (
        <div className='ScreenContainer crystalBall-bg-img bg-img'>
            <h2>Lazy Susan</h2>
            <p>Spinny card thing here</p>

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
