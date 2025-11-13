import { useNavigate } from 'react-router-dom'

import MultiUseButton from "../Components/MultiUseButton";

function Title() {
    const navigate = useNavigate();

    return (
        <div className='ScreenContainer'>
            <h1>This is the front page</h1>
            <p>Display the Gypsy lady here</p>

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
