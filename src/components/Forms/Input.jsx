import React from 'react'
import EyeGif from './../../assets/Eye_gif.gif'
import { FORM_ACTIONS } from './Forms';


function Input( {inputClass, inputType, placeHolderText, clickAction, toggleBetweenForms} ) {
  return (
    <div className='input'>
        <div className='field'>
            <input className={inputClass} type={inputType} onChange={(e) => {clickAction(FORM_ACTIONS.MOVE_PLACEHOLDER, e); inputClass.includes("signUp") ? clickAction(FORM_ACTIONS.ADD_FORM_DATA, e) : console.log()}} onBlur={(e) => {clickAction(FORM_ACTIONS.CHECK_INPUT, e)}}/>
            <span className='placeHolder' onClick={(e) => {clickAction(FORM_ACTIONS.FOCUS_TO_FIELD, e)}}>{placeHolderText}</span>
            {inputType === "password" ? <img src={EyeGif} alt="eyeGif" onClick={(e) => {clickAction(FORM_ACTIONS.TOGGLE_PASSWORD_TEXT, e)}}/> : null }
        </div>
            {inputClass === "signUp-password" ? <div className='info'>Use 8 or more characters with a mix of letters, numbers & symbols.</div> : null}
            {inputClass === "signIn-password" ? <div className='recover-ctn'><div id='recover' className='recover' onClick={(e) => {toggleBetweenForms(e)}}>Forget my password</div></div> : null}
    </div>
  )
}

export default Input