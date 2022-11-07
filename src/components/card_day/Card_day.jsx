import React from 'react'
import Priority1 from './../../assets/Not-Important_Not-Ergent.png'
import Priority2 from './../../assets/Not-Important_Ergent.png'
import Priority3 from './../../assets/Important_Not-Ergent.png'
import Priority4 from './../../assets/Important_Ergent.png'

function Card_day( {title, array, getClickedDay} ) {

  let numberOfTasksDone = array.filter(task => task.state === "done").length;

  //
  function toggleActive(e) {
    let arrayOfCards = document.querySelectorAll('.card-day')

    // remove active class
    arrayOfCards.forEach(card => {
      card.classList.remove('active');
    })

    // add active to clicked link
    arrayOfCards.forEach(link => {
        if (link.classList.value.includes(e)) {
        link.classList.add('active');
        }
    })
  }

  return (
    <div className={`card-day ${array.length > 7 ?"flow-card" : ''} ${title}`} onClick={(e) => {getClickedDay(title); toggleActive(title)}}>

        <div className="head">
          <h3>{title}</h3>
          <span>{numberOfTasksDone}/{array.length}</span>
        </div>

        <div className="task-container">

          {
            array.map(task => (
              <div className={`task ${task.state}`} key={task.id}>
                <img src={
                  task.priority === "Not-Important_Not-Ergent" ? Priority1 
                  : task.priority === "Not-Important_Ergent" ? Priority2  
                  : task.priority === "Important_Not-Ergent" ? Priority3  
                  : Priority4
                } alt={task.priority} />
                <p className='overFlow-text-hide'>{task.title}</p>
              </div>
            ))
          }

        </div>

    </div>
  )
}

export default Card_day