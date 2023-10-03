import { useEffect, useState } from "react";
import Tilt from 'react-parallax-tilt';
import '../styles/card.css'

export default function Card ({characterName, characterImage, handleClick, id}) {

    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
      setFlipped(false);
    }, [id]);

    return (

                <Tilt
                    glareEnable={true}
                    glareMaxOpacity={0.6}
                    glareColor="#ffffff"
                    glarePosition="bottom"
                    glareBorderRadius="20px"
                    className={`card-container ${flipped ? "flipped" : ""}`}
                    >
                        <div className="card-inner">
                            <div className='card-face' 
                            onClick={() => {
                                if (!flipped) {
                                  handleClick();
                                  setFlipped(true);
                        
                                  setTimeout(() => {
                                    setFlipped(false);
                                  }, 1000);
                                }
                              }}
                            >
                                <div className='card-image'
                                    style={{backgroundImage: `url(${characterImage})`}}>
                                </div>
                                <div className='card-name'>{characterName}</div>
                            </div>
                            <div className='card-back'></div>
                        </div>
                </Tilt>
    ) 
}