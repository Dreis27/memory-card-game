import Card from './card';
import { useEffect, useState } from 'react';

export default function Game () {

    const [cardsArray, setCardsArray] = useState([]);
    const [score, setScore] = useState('0');
    const [highScore, setHighScore] = useState('0');
    const [cardsShowing, setCardsShowing] = useState(true);

    const pokemonToFetch = ['pikachu', 'charizard', 'bulbasaur', 'squirtle', 'snorlax', 'gengar', 'mewtwo', 'jigglypuff', 'eevee', 'machop'];

    useEffect(() => {
  
      // Fetch data for each Pokémon and construct card objects
      const fetchDataForPokemon = async () => {
        const pokemonCardList = await Promise.all(
          pokemonToFetch.map(async (pokemonName) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();
            return {
              name: data.name,
              image: data.sprites.other['official-artwork'].front_default,
              beenClicked: false,
              id: data.name
            };
          })
        );
        const shuffledArray = shuffleArray(pokemonToFetch);

        setCardsArray(shuffledArray);
      };
  
      fetchDataForPokemon();
    }, []);


    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length -1; i>0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const handleClick = (cardId) => {
      const clickedCard = cardsArray.find((card) => card.id === cardId);

      if(!clickedCard.beenClicked) {
        const updateCardsArray = cardsArray.map((card)=>
        card.id === cardId ? {...card, beenClicked: true} : card)

        setCardsArray(updateCardsArray);

        setCardsShowing(false);

        const shuffledArray = shuffleArray(updateCardsArray);
        setCardsArray(shuffledArray);

        setScore(score+1);

        setTimeout(() => {
          setCardsShowing(true);
        }, 1000);
      } else {
        setHighScore(score);
        alert('You clicked the same card twice. You lose!');
      }
    }

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
                        handleClick={handleClick}
                        cardsShowing={cardsShowing}
                        key={card.name}
                        id={card.name}
                    />
                ))}
            </div>
        </div>
    )
}