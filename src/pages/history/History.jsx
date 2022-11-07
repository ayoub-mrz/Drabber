/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import ArrowSvg from './../../assets/ArrowSvg'
import CardDay from './../../components/card_day/Card_day'

function History( {userProfile} ) {

  const [history, setHistory] = useState(userProfile.history);
  let cardList;

  function toggleContent(id) {
    let head = document.getElementById(id);
    head.children[0].classList.toggle('flip');
    head.parentElement.children[1].classList.toggle('show');
  }

  return (
    <div className='historySection'>

      {history.length === 0 ?
        <div className="mockupHistory">
          <p>When you pass a week, your history shold be here.</p>
        </div>
      : null}

      {history.map((obj, i) => (
        <div className="historyWeek" key={i}>
          <div className="head" id={obj.Date} onClick={() => {toggleContent(obj.Date)}}>
            <ArrowSvg />
            <h2>{obj.Date}</h2>
            <div className="progressBar" style={{width: `${history[i].percent}%`}} title={`Week Percent: ${history[0].percent}%`}></div>
          </div>
          <div className="weekContent">
            {cardList = Object.keys(history[i].WeekArchive).map((day) => {
              return <CardDay title={day} array={history[i].WeekArchive[day]} key={day}/>
            })}
          </div>
        </div>
      ))}


    </div>
  )
}

export default History