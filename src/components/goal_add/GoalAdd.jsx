import React from 'react'
import FormLoad from './../../assets/form_load.gif'
import Close from './../../assets/Close';
import { POPUP_ACTIONS } from './../../App'

function Goal_add( {popupAction, passAdd, createUpMsg, switchInputPopUp} ) {

  return (
    <div className='goal-add backgroundBlur'>
      
      <div className='close' onClick={() => {switchInputPopUp("goal")}}>
          <Close />
      </div>

        <div className="popupCard">
          <div className="inputName">
            <h5>Goal Name</h5>
            <input className='goal-input' type="text" autoFocus={true} placeholder='...' onChange={(e) => {popupAction(POPUP_ACTIONS.STYLE_INPUT, e)}} onBlur={(e) => {popupAction(POPUP_ACTIONS.CHECK_INPUT, e)}}/>
          </div>
          <div className="numDays">
            <h5>Number of days <span>(10 ~ 120)</span></h5>
            <input className='days-input' type="number" placeholder='60' min="5" max="120" onChange={(e) => {popupAction(POPUP_ACTIONS.STYLE_INPUT, e)}} onBlur={(e) => {popupAction(POPUP_ACTIONS.CHECK_INPUT, e)}}/>
          </div>
          <button onClick={(e) => {passAdd.input1 && passAdd.input2 ? popupAction(POPUP_ACTIONS.ADD_GOAL, e) : createUpMsg("red", "Please fill all inputs")}}>
            <span id='btn-text'>Add</span>
            <img id='btn-img' src={FormLoad} alt="Loader" />
          </button>
        </div>

    </div>
  )
}

export default Goal_add