import Card from './card';
import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import '../styles/game.css'

export default function Game () {

    const [cardsArray, setCardsArray] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [flipped, setFlipped] = useState(false);

  

    const pokemonToFetch = ['pikachu', 'charizard', 'bulbasaur', 'squirtle', 'snorlax', 'gengar', 'mewtwo', 'jigglypuff', 'eevee', 'machop'];

    useEffect(() => {
  
      const fetchDataForPokemon = async () => {
        const pokemonCardList = await Promise.all(
          pokemonToFetch.map(async (pokemonName) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();

            return {
              name: data.name,
              image: data.sprites.other['official-artwork'].front_default,
              beenClicked: false,
              id: uniqid()
            };
          })
        );

        const shuffledArray = shuffleArray(pokemonCardList);

        setCardsArray(shuffledArray);
      };
  
      fetchDataForPokemon();
    }, []);

    useEffect(() => {
      console.log(cardsArray);
    }, [cardsArray]);


    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length -1; i>0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const resetCardsArray = () => {
      const resetBeenClickedCardsArray = cardsArray.map((card) => ({
        ...card,
        beenClicked: false
      }));
      return resetBeenClickedCardsArray;
    }

    const handleClick = (cardId) => {
      console.log('click',cardsArray);

      const clickedCard = cardsArray.find((card) => card.id === cardId);
  
      if (!clickedCard.beenClicked) {
        const updateCardsArray = cardsArray.map((card) =>
          card.id === cardId ? { ...card, beenClicked: true } : card
        );
  
        setCardsArray(updateCardsArray);

        setScore(score + 1);
        setFlipped(true); 
        
        setTimeout(() => {
          setCardsArray(shuffleArray(updateCardsArray));
        }, 500);

        setTimeout(() => {
          setFlipped(false); 
        }, 1300);

        if(score+1 >= 3){
          setCardsArray(resetCardsArray());
          console.log('you win');
          setScore(0);
          setHighScore(score+1);
        }

        
      } else {
        if (score > highScore) {
          setHighScore(score);
        }
        setScore(0);
        alert('You clicked the same card twice. You lose!');

        setCardsArray(resetCardsArray());
      }
    };

    return (
        <div className="game">
            <div className='score-container'>
                <div className='score'>CURRENT SCORE: {score}</div>
                <div className='high-score'>HIGH SCORE: {highScore}</div>
            </div>
            <div className="cards-container">
                {cardsArray.map((card) => (
                    <Card 
                        characterName={card.name}
                        characterImage={card.image}
                        handleClick={() => handleClick(card.id)} 
                        key = {card.id}
                        id={card.id}
                        flipped={flipped}
                    />
                ))}
            </div>
        </div>
    )
}