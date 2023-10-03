import { useEffect, useState } from "react";
import Tilt from 'react-parallax-tilt';

export default function Card ({characterName, characterImage, handleClick, cardsShowing}) {

    const ANIMATION_TIME = 850;
    const [interactable, setInteractable] = useState(false);
  
    useEffect(() => {
      setTimeout(() => setInteractable(true), ANIMATION_TIME);
    }, []);

    return (

                <Tilt
                    glareEnable={true}
                    glareMaxOpacity={0.6}
                    glareColor="#ffffff"
                    glarePosition="bottom"
                    glareBorderRadius="20px"
                    className={`card-container ${cardsShowing ? "front" : "back"} ${
                        cardsShowing && interactable ? undefined : "pointer-events-none"
                      }`}>
                        <div className="the-card">
                            <div className='card-face'>
                                <div className='card-image' onClick={handleClick}
                                    style={{backgroundImage: `url(${characterImage})`}}>
                                </div>
                                <div className='card-name'>{characterName}</div>
                            </div>
                            <div className='card-back'></div>
                        </div>
                </Tilt>
    ) 
}