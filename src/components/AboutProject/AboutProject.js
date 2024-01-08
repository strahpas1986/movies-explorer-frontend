import './AboutProject.scss';

import NavTab from '../NavTab/NavTab';

function AboutProject({ aboutRef }) {
  return (
    <section className='about-project' id='about-project'>
      <NavTab title="О проекте"/>
      <div className='about-project__columns'>
        <div className='about-project__column'>
          <h3 className='about-project__subheader'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__descr'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__column'>
          <h3 className='about-project__subheader'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__descr'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__plan-weekly'>
        <div className='about-project__stage about-project__stage_first'>
          <p className='about-project__stage-subheader'>1 неделя</p>
          <p className='about-project__stage-descr'>Back-end</p>
        </div>
        <div className='about-project__stage about-project__stage_second'>
          <p className='about-project__stage-subheader about-project__stage-subheader_second'>4 недели</p>
          <p className='about-project__stage-descr'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
