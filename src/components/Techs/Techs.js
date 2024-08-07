import './Techs.scss';

import NavTab from '../NavTab/NavTab';

function Techs({ aboutRef }) {
  return (
    <section className='techs'>
      <NavTab title="Технологии" />
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__descr'>
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className='techs__list'>
        <li className='techs__list-item'>
          <p className='techs__list-item_descr'>HTML</p>
        </li>
        <li className='techs__list-item'>
          <p className='techs__list-item_descr'>CSS</p>
        </li>
        <li className='techs__list-item'>
          <p className='techs__list-item_descr'>JS</p>
        </li>
        <li className='techs__list-item'>
          <p className='techs__list-item_descr'>React</p>
        </li>
        <li className='techs__list-item'>
          <p className='techs__list-item_descr'>Git</p>
        </li>
        <li className='techs__list-item'>
          <p className='techs__list-item_descr'>Express.js</p>
        </li>
        <li className='techs__list-item'>
          <p className='techs__list-item_descr'>mongoDB</p>
        </li>
      </ul>
    </section>
  )
}

export default Techs;
