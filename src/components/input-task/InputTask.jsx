import React, { useState } from 'react'
import ChevronDown from './../../assets/ChevronDown'
import Priority1 from './../../assets/Not-Important_Not-Ergent.png'
import Priority2 from './../../assets/Not-Important_Ergent.png'
import Priority3 from './../../assets/Important_Not-Ergent.png'
import Priority4 from './../../assets/Important_Ergent.png'
import FormLoad from './../../assets/form_load.gif'
import { POPUP_ACTIONS } from './../../App'
import { useEffect } from 'react'

function InputTask( {popup, popupAction, togglePopup, passAdd, createUpMsg, days, setPassAdd} ) {

    function changeActive(e) {
        
        let elementArray = document.querySelectorAll('.priority img');

        // remove active class
        elementArray.forEach(link => {
            link.classList.remove('active');
        })
        // add active to clicked link
        elementArray.forEach(link => {
            if (link.classList.value.includes(e)) {
                link.classList.add('active');
            }
        })

    }

    //
    const [allActiveDaysBtn, setAllActiveDaysBtn] = useState('');

    function toggleActive(e) {
        e.target.classList.toggle('active');
        setAllActiveDaysBtn(document.querySelectorAll('.chose-day .active'));
    }
    
    useEffect(() => {
        if (allActiveDaysBtn.length > 0 && days) {
            setPassAdd({...passAdd, input4: true})
        } else if(days) {
            setPassAdd({...passAdd, input4: false})
        }
    }, [allActiveDaysBtn])

    let daysToAddTask = [];

    if (allActiveDaysBtn.length > 0) {
        allActiveDaysBtn.forEach(e => {
            daysToAddTask.push(e.classList[1])
        })
    }

    function selectAll() {
        document.querySelectorAll('.chose-day .day').forEach(day => {
            day.classList.add('active');
        })
        setAllActiveDaysBtn(document.querySelectorAll('.chose-day .active'))
    }

return (
    <div className="input-task">

        <div className="input-container">
            <p>Add Task</p>
            <div className="input">
                <input className='task-input' placeholder='do some thing...' autoFocus={!days} onChange={(e) => {popupAction(POPUP_ACTIONS.STYLE_INPUT, e); popupAction(POPUP_ACTIONS.SET_TASK_DATA, e)}} onBlur={(e) => {popupAction(POPUP_ACTIONS.CHECK_INPUT, e)}}/>
                <div className="info-btn popUpMenu" onClick={() => {togglePopup('taskInput-option')}}><ChevronDown /></div>
                
                <div className={popup.taskOption ? "task-info popUpMenu" : "task-info popUpMenu hide"}>
                    <div className="priority popUpMenu">
                        <img className='priority1 popUpMenu' src={Priority1} title="Not-Important_Not-Ergent" alt="Priority" onClick={(e) => {popupAction(POPUP_ACTIONS.SET_TASK_DATA, e, "Not-Important_Not-Ergent"); changeActive("priority1")}}/>
                        <img className='priority2 popUpMenu' src={Priority2} title="Not-Important_Ergent" alt="Priority" onClick={(e) => {popupAction(POPUP_ACTIONS.SET_TASK_DATA, e, "Not-Important_Ergent"); changeActive("priority2")}}/>
                        <img className='priority3 popUpMenu' src={Priority3} title="Important_Not-Ergent" alt="Priority" onClick={(e) => {popupAction(POPUP_ACTIONS.SET_TASK_DATA, e, "Important_Not-Ergent"); changeActive("priority3")}}/>
                        <img className='priority4 popUpMenu' src={Priority4} title="Important_Ergent" alt="Priority" onClick={(e) => {popupAction(POPUP_ACTIONS.SET_TASK_DATA, e, "Important_Ergent"); changeActive("priority4")}}/>
                    </div>
                    {days ? <div className="chose-day popUpMenu">
                        <div className="day monday popUpMenu" onClick={(e) => {toggleActive(e)}}>Mo</div>
                        <div className="day tuesday popUpMenu" onClick={(e) => {toggleActive(e)}}>Tu</div>
                        <div className="day wednesday popUpMenu" onClick={(e) => {toggleActive(e)}}>We</div>
                        <div className="day thursday popUpMenu" onClick={(e) => {toggleActive(e)}}>Th</div>
                        <div className="day friday popUpMenu" onClick={(e) => {toggleActive(e)}}>Fr</div>
                        <div className="day saturday popUpMenu" onClick={(e) => {toggleActive(e)}}>Sa</div>
                        <div className="day sunday popUpMenu" onClick={(e) => {toggleActive(e)}}>Su</div>
                        <div className="all-btn popUpMenu" onClick={() => {selectAll()}}>All</div>
                    </div> : null}
                    <div className="pomodoro-input popUpMenu">
                        <span className='popUpMenu'>Pomodoro Number</span>
                        <input className='inputPry popUpMenu' type="number" placeholder='5' onChange={(e) => {popupAction(POPUP_ACTIONS.SET_TASK_DATA, e); popupAction(POPUP_ACTIONS.STYLE_INPUT, e)}} onBlur={(e) => {popupAction(POPUP_ACTIONS.CHECK_INPUT, e)}}/>
                    </div>
                </div>

            </div>
        </div>
        <div className={days ? "add-btn btn-wide weekInput" : "add-btn btn-wide todayInput"} type='submit' 
            onClick={(e) => 
            {passAdd.input1 && passAdd.input2 && passAdd.input3 && !days ? popupAction(POPUP_ACTIONS.TASK_ADD, e) 
            : passAdd.input1 && passAdd.input2 && passAdd.input3 && passAdd.input4 && days ? popupAction(POPUP_ACTIONS.TASK_ADD, e, '', daysToAddTask) 
            : createUpMsg("red", "Please fill all inputs")}}>
            <span id='btn-text' className={days ? 'weekInput' : 'todayInput'}>Add</span>
            <img id='btn-img' src={FormLoad} alt="loader" />
        </div>

    </div>
)
}

export default InputTask