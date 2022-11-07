import React from 'react'
import PlusSvg from './../../assets/PlusSvg'
import SettingSvg from './../../assets/SettingSvg'

function FlowBtn( {switchInputPopUp, currentSection, showSettings, setShowSettings} ) {
  return (
    <div className='flow-btn'>
      {currentSection === "home" ?
      <div className='add' onClick={() => {switchInputPopUp("goal")}}>
      <PlusSvg />
      <span>Add Goal (+)</span>
      </div>
      : null}
      {currentSection === "today" ?
      <div className='add' onClick={() => {switchInputPopUp("task")}}>
      <PlusSvg />
      <span>Add Task (+)</span>
      </div>
      : null}
      {currentSection === "pomodoro" && !showSettings ?
      <div className='show' onClick={() => {setShowSettings(true)}}>
      <SettingSvg />
      <span>Show Settings</span>
      </div>
      : null}
    </div>
  )
}

export default FlowBtn