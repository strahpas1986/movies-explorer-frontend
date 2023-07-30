import './Promo.css';

// import { handleScrollEffect } from '../../utils/utils';

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
        <button className="promo__btn" type="button">
          <a href='#about-project' className='promo__btn_link'>
            Узнать больше
          </a>
        </button>
      </div>
      <img className='promo__img' src={image_bg} alt="Изображение земного шара" />
    </section>
  )
}

export default Promo;
