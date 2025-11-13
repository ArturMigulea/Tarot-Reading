import { useNavigate } from 'react-router-dom'

import MultiUseButton from "../Components/MultiUseButton";

function Title() {
    const navigate = useNavigate();

    return (
        <div className='ScreenContainer gypsy-bg-img bg-img' style={{ marginTop: "40%" }}>
            <h1>Ready to read your fate?</h1>

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

export default Title
