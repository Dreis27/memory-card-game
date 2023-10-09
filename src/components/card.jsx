import Tilt from 'react-parallax-tilt';
import '../styles/card.css'
import pokeball from '../assets/pokeball.png';


export default function Card ({characterName, characterImage, handleClick, id, flipped}) {

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
                              onClick={handleClick}>
                                <img src={characterImage} alt={characterName} />
                                <div className='card-name'>{characterName}</div>
                            </div>
                            <div className='card-back'>
                                <img src={pokeball} alt="pokeball" />
                            </div>
                        </div>
                </Tilt>

              
    ) 
}