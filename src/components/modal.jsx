

export default function Modal({show, onClose, status}){
    if (!show) {
      return null;
    }
  
    const modalStyles = {
        backgroundImage: status === 'won' ? 'url(/path/to/win-image.jpg)' : 'url(/path/to/lose-image.jpg)',
        borderColor: status === 'won' ? 'green' : 'red'
      };


    return (
      <div className="modal-overlay">
        <div className="modal-content" style={modalStyles}>
          <h2>{status === 'won' ? 'Congratulations!' : 'Game Over'}</h2>
          <p>{status === 'won' ? 'You won the game!' : 'You lost the game.'}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
