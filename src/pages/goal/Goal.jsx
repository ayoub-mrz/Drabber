import React from 'react'
import Check from './../../assets/Check'
import UnCheck from './../../assets/Close'
import Option from './../../assets/Ellipsis'
import GarbageSvg from './../../assets/TrashSvg'

function Goal( {popup, togglePopup, goal, deleteGoal, updateDays} ) {

  // Set nums of days
  let numDays = goal.days.length;

  // Set Finished days
  let finishedDays = goal.days.filter(day => day.state === "finish").length;

  // Set Title Goal
  let titleSpan = document.querySelector('.title-section span');
  titleSpan.textContent = goal.title;


  return (
    <div className='goalsSection'>
      <div className="goal-option popUpMenu">
        <div className="option" onClick={() => {togglePopup("goal-option")}}><Option /></div>
        <div className="option-container popUpMenu">
          {popup.goalOption ? 
          <div className="popup-option popUpMenu">
            <div className="delete popUpMenu" onClick={() => {deleteGoal()}}><GarbageSvg />Delete Goal</div>
          </div>
          : null}
        </div>
      </div>
      <div className="goal-progress">
        <div className="progress-line-container">
          <div className="progress-start">{finishedDays}</div>
          {goal.days.map(day => (
            <div className={day.state === "finish" ? "line line-done" : "line"} key={day.id}></div>
          ))}
          <div className="progress-end">{numDays}</div>
        </div>
      </div>
      <div className="goal-days">

        {goal.days.map((day, i) => (
          <div className={`day ${day.state}`} key={day.id}>
            <span>day {i + 1}</span>
            <div className="check" onClick={() => {updateDays("finish", day.id)}}><Check /></div>
            <div className="unCheck" onClick={() => {updateDays("unfinish", day.id)}}><UnCheck /></div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Goal