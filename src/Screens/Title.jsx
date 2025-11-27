import { useNavigate } from 'react-router-dom';
import './Title.css';

import MultiUseButton from "../Components/MultiUseButton";

function Title() {
    const navigate = useNavigate();

    return (
        <div className='ScreenContainer title-page'>
            
            {/* Curved heading stays at the top */}
            <h1 className="curved-heading">
                <svg width="800" height="300" viewBox="0 0 100 50">
                    <defs>
                        <path id="curve" d="M5 35 C20 5 80 5 95 35" />
                    </defs>
                    <text>
                        <textPath href="#curve" startOffset="50%" textAnchor="middle">
                            Ready to Read Your Fate?
                        </textPath>
                    </text>
                </svg>
            </h1>

            {/* Gypsy image wrapper */}
            <div className="gypsy-image-wrapper">
                <img 
                    src={`../NoBackgroundGypsyLady.png`} 
                    className="gypsy-img" 
                    alt="gypsy" 
                />
                
                <div className="button-wrapper">
                    <MultiUseButton
                        buttons={[
                            {
                                label: "Begin",
                                onClick: () => navigate('/Screens/TypeSelect')
                            }
                        ]}
                    />
                </div>
            </div>

            <p className='artist-credits'>Artist Credits: Megan Lynn Kott and Corina Migulea</p>

            <div className="info-button-wrapper">
                <div className="info-icon">i</div>
                <div className="info-tooltip">
                    This tarot reading is intended purely for fun and entertainment,
                    and should not be taken as professional advice
                    or used to make important life decisions.
                </div>
            </div>
        </div>
    )
}

export default Title;

