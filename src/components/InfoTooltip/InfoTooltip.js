import succes from '../../images/icon-succes.svg';
import error from '../../images/icon-error.svg';
import './InfoTooltip.css';

function InfoTooltip({name , isOpen, onClose, isSuccessInfoTooltipStatus}) {
  const {isSuccess, text} = isSuccessInfoTooltipStatus;

  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__info">
        <img className="popup__info-img" src={isSuccess? succes : error} alt={text}/>
        <h2 className="popup__info-text">{text}</h2>
      </div>
      <button className="popup__close link-hover" type="button" onClick={onClose}></button>
      </div>
    </section>
  )
}

export default InfoTooltip;
