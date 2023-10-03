import Card from './card';
import { useEffect, useState } from 'react';

export default function Game ({handleClick, score, highScore}) {

    const [cardsArray, setCardsArray] = useState([]);

    useEffect(() => {
      const pokemonToFetch = ['pikachu', 'charizard', 'bulbasaur', 'squirtle', 'snorlax', 'gengar', 'mewtwo', 'jigglypuff', 'eevee', 'machop'];
  
      // Fetch data for each Pokémon and construct card objects
      const fetchDataForPokemon = async () => {
        const pokemonCardList = await Promise.all(
          pokemonToFetch.map(async (pokemonNameOrId) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
            const data = await response.json();
            return {
              name: data.name,
              image: data.sprites.other['official-artwork'].front_default,
            };
          })
        );
  
        setCardsArray(pokemonCardList);
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
                        cardsShowing={true}
                        key={card.name}
                    />
                ))}
            </div>
        </div>
    )
}