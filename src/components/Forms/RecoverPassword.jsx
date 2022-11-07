import React from 'react' 
import FormLoad from './../../assets/form_load.gif'
import Input from './Input';
import { FORM_ACTIONS } from './Forms';


function ForgetPassword( {clickAction, passSubmit, createUpMsg} ) {
    return (
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">

            <Input inputClass={"recover-name"} inputType={"text"} placeHolderText="UserName" clickAction={clickAction}/>

            <Input inputClass={"recover-age"} inputType={"number"} placeHolderText="Age" clickAction={clickAction}/>

            <Input inputClass={"recover-password"} inputType={"password"} placeHolderText="New Password" clickAction={clickAction}/>

            <button id='forget-btn' onClick={(e) => {passSubmit.name && passSubmit.password && passSubmit.age ? clickAction(FORM_ACTIONS.CHANGE_PASSWORD, e) : createUpMsg("red", "Please fill all the inputs.")}}>
                <span id='btn-text'>Change</span>
                <img id='btn-img' src={FormLoad} alt="Loader" />
            </button>
        </form>
)
}

export default ForgetPassword