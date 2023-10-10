import Card from './card';
import Modal from './modal';
import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import '../styles/game.css'
import HomeScreen from './home-screen'

export default function Game () {

    const [cardsArray, setCardsArray] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [status, setStatus] = useState('');
    const [show, setShow] = useState(false);
    const [page, setPage] = useState('home');

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

    const start = () => {
      setPage('game');
    }
    const home = () => {
      onModalClose();
      setPage('home');
    }


    const handleClick = (cardId) => {

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

        if(score+1 >= 10){
          setTimeout(() => {
            const resetCards = resetCardsArray();
            setCardsArray(resetCards);
          }, 600);
          setStatus('won');
          setShow(true);
          setScore(0);
          setHighScore(score+1);
         
        }

        
      } else {
        if (score > highScore) {
          setHighScore(score);
        }
        setScore(0);
        setStatus('lost');
        setShow(true);

        setCardsArray(resetCardsArray());
      }
    };

    const onModalClose = () => {
      setShow(false);
    }

    return (
      <>
        {(page!=='home') ? (<div className="game">
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
        </div>) : (<HomeScreen handleStart={start}/>)}
        <Modal
            show={show}
            onClose={onModalClose}
            status={status}
            onReturnToMenue={home}
        />
      </>
    )
}