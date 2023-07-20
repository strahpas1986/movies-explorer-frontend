import './Promo.css';

import NavTab from '../NavTab/NavTab';

import image_bg from '../../images/image_bg.svg';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__wrapper'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className='promo__subtitle'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <NavTab />
      </div>
      <img className='promo__img' src={image_bg} alt="Изображение земного шара" />
    </section>
  )
}

export default Promo;
