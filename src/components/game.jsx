import Card from './card';

export default function Game ({cardsArray, handleClick}) {
    return (
        <div className="game">
            <div className="cards-container">
                {cardsArray.map((card) => (
                    <Card 
                        character={card.character}
                        handleClick={handleClick}
                        cardsShowing={true}
                        key={card.id}
                    />
                ))}
            </div>
        </div>
    )
}