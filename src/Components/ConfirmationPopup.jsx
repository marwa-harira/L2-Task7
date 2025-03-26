import "../styles/popup.css";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <p>{message}</p>
                <div className="popup-buttons">
                    <button className="btn btn-danger" onClick={onConfirm}>Yes</button>
                    <button className="btn btn-primary" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
