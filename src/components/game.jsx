import Card from './card';
import { useEffect, useState } from 'react';

export default function Game ({cardsArray, handleClick, score, highScore}) {

    const [cardsArray, setCardsArray] = useState([]);

    useEffect(() => {
      // Define the names or IDs of the Pokémon you want to fetch
      const pokemonToFetch = ['pikachu', 'charizard', 'bulbasaur', 'squirtle', 'snorlax', 'gengar', 'mewtwo', 'jigglypuff', 'eevee', 'machop'];
  
      // Fetch data for each Pokémon and construct card objects
      const fetchDataForPokemon = async () => {
        const pokemonCardList = await Promise.all(
          pokemonToFetch.map(async (pokemonNameOrId) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
            const data = await response.json();
            return {
              name: data.name,
              image: data.sprites.front_default,
            };
          })
        );
  
        // Update state with the Pokémon card objects
        setCardsArray(pokemonCardList);
      };
  
      fetchDataForPokemon();
    }, []);

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
                        key={card.id}
                    />
                ))}
            </div>
        </div>
    )
}