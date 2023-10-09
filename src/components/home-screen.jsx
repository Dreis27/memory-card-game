import '../styles/home-screen.css'
import pokemonLogo from '../assets/pokemonLogo.png';

export default function HomeScreen() {

    return (
        <div className="game-info-container">
            <img src={pokemonLogo} alt="pokemon logo" />
            <h1>Memory Game</h1>
            <p className="game-instruction">Dont&apos;t click the same card twice!</p>
            <p className="start-instruction">Click the Pokemon logo to start!</p>
        </div>
    )
}