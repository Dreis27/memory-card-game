import '../styles/home-screen.css'
import pokemonLogo from '../assets/pokemonLogo.png';

export default function HomeScreen({ handleStart }) {

    return (
        <div className="game-info-container">
            <img src={pokemonLogo} alt="pokemon logo" />
            <h1>Memory Game</h1>
            <p className="game-instruction">Dont&apos;t click the same card twice!</p>
            <button onClick={handleStart}>START</button>
        </div>
    )
}