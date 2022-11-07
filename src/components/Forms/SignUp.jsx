import React from 'react'
import FormLoad from './../../assets/form_load.gif'
import { FORM_ACTIONS } from './Forms';
import Input from './Input';


function SignUp( {clickAction, passSubmit, createUpMsg} ) {
    return (
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">

            <Input inputClass={"signUp-name"} inputType={"text"} placeHolderText="UserName" clickAction={clickAction}/>

            <Input inputClass={"signUp-password"} inputType={"password"} placeHolderText="Password" clickAction={clickAction}/>

            <Input inputClass={"signUp-age"} inputType={"number"} placeHolderText="Age" clickAction={clickAction}/>

            <button id='signUp-btn' onClick={(e) => {passSubmit.name && passSubmit.password && passSubmit.age ? clickAction(FORM_ACTIONS.ADD_USER, e) : createUpMsg("red", "Please fill all the inputs.")}}>
              <span id='btn-text'>Sign Up</span>
              <img id='btn-img' src={FormLoad} alt="Loader" />
            </button>
        </form>
  )
}

export default SignUp