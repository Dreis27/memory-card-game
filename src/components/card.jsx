import Tilt from 'react-parallax-tilt';

export default function Card ({character, isFlipped, handleClick}) {
    return (
        <div className={isFlipped ? "card flipped" : "card"}
                onClick={() => {handleClick(character)}}>
                <Tilt
                    glareEnable={true}
                    glareMaxOpacity={0.6}
                    glareColor="#ffffff"
                    glarePosition="bottom"
                    glareBorderRadius="20px"
                    className='tilt'>
                        <div className='card-face'>
                            <div className='card-image'
                                style={{backgroundImage: `url(${character.src})`}}>
                            </div>
                            <div className='card-name'>{character.name}</div>
                        </div>
                        <div className='card-back'></div>
                </Tilt>
        </div>
    ) 
}