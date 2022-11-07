import React from 'react'
import FormLoad from './../../assets/form_load.gif'
import { FORM_ACTIONS } from './Forms';
import Input from './Input';

function SignIn( {clickAction, toggleBetweenForms, passSubmit, createUpMsg} ) {
    return (
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">

            <Input inputClass={"signIn-name"} inputType={"text"} placeHolderText="UserName" clickAction={clickAction}/>

            <Input inputClass={"signIn-password"} inputType={"password"} placeHolderText="Password" clickAction={clickAction} toggleBetweenForms={toggleBetweenForms}/>

            <button id='signIn-btn' onClick={(e) => {passSubmit.name && passSubmit.password ? clickAction(FORM_ACTIONS.LOG_IN, e) : createUpMsg("red", "Please fill all the inputs.")}}>
                <span id='btn-text'>Sign In</span>
                <img id='btn-img' src={FormLoad} alt="Loader" />
            </button>
        </form>
)
}

export default SignIn