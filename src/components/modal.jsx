import '../styles/modal.css'
import wonImage from '../assets/pokemon_won.jpg';
import lostImage from '../assets/pokemon_lost.jpg';

export default function Modal({show, onClose, status}){
    if (!show) {
      return null;
    }
  
    const modalStyles = {
        backgroundImage: status === 'won' ? `url(${wonImage})` : `url(${lostImage})`,
        borderColor: status === 'won' ? 'green' : 'red'
      };
    
    const buttonStyles = {
        backgroundColor: status === 'won' ? 'rgb(0, 187, 78)' : 'rgb(180, 26, 26)'
    }


    return (
      <div className="modal-overlay">
        <div className="modal-content" style={modalStyles}>
          <h2>{status === 'won' ? 'Congratulations!' : 'Game Over'}</h2>
          <p>{status === 'won' ? 'You won the game!' : 'You lost the game.'}</p>
          <button className='modal-button' 
            onClick={onClose} 
            style={buttonStyles}
          >Play Again
          </button>
        </div>
      </div>
    );
  }
