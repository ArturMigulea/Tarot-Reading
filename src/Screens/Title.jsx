import { useNavigate } from 'react-router-dom'

import MultiUseButton from "../Components/MultiUseButton";

function Title() {
    const navigate = useNavigate();

    return (
        <div className='ScreenContainer gypsy-bg-img bg-img'>
            <div style={{ marginTop: "25%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                <h1>Ready to read your fate?</h1>

                <MultiUseButton
                    buttons={[
                        {
                            label: "Type Select",
                            onClick: () => navigate('/Screens/TypeSelect')
                        }
                    ]}
                />
                <p>This tarot reading is intended purely for fun and entertainment, and should not be taken as professional advice or used to make important life decisions.</p>
            </div>
        </div>
    )
}

export default Title
