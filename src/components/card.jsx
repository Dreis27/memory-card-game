import { useEffect, useState } from "react";
import Tilt from 'react-parallax-tilt';

export default function Card ({characterName, characterImage, handleClick, cardsShowing, id}) {

    return (

                <Tilt
                    glareEnable={true}
                    glareMaxOpacity={0.6}
                    glareColor="#ffffff"
                    glarePosition="bottom"
                    glareBorderRadius="20px"
                    className={`card-container ${cardsShowing ? "front" : "back"}`}>
                        <div className="card-inner">
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