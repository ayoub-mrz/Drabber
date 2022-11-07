import React from 'react'
import Close from './../../assets/Close';
import InputTask from './../input-task/InputTask'

function Task_add( {switchInputPopUp, popup, togglePopup, popupAction, passAdd, createUpMsg} ) {
  return (
    <div className='task-add backgroundBlur'>

      <div className='close' onClick={() => {switchInputPopUp("task")}}>
          <Close />
      </div>

      <div className="popupCard">

        <InputTask popup={popup} togglePopup={togglePopup} popupAction={popupAction} passAdd={passAdd} createUpMsg={createUpMsg} days={false}/>

      </div>
        
    </div>
  )
}

export default Task_add