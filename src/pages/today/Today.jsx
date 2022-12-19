import React from 'react'
import CheckImg from './../../assets/check.png'
import Option from './../../assets/Ellipsis'
import GarbageSvg from './../../assets/TrashSvg'
import Priority1 from './../../assets/Not-Important_Not-Ergent.png'
import Priority2 from './../../assets/Not-Important_Ergent.png'
import Priority3 from './../../assets/Important_Not-Ergent.png'
import Priority4 from './../../assets/Important_Ergent.png'

function Today( {popup, setPopup, currentAccount, deleteTask, toggleCheckBox, toggleOption} ) {

  // Set array of days
  const arrayDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  let d = new Date();
  let day = arrayDays[d.getDay()];

  // Set Title Goal
  let titleSpan = document.querySelector('.title-section span');
  titleSpan.textContent = day;


  // Get Today Object
  let today = currentAccount[0].thisWeek[day];

  //
  let todo = today.filter(task => task.state === 'todo');

  //
  let done = today.filter(task => task.state === 'done');

  return (
    <div className='todaySection'>
        <div className="column-container">

          <div className="todo-column">
            <div className="head">
              <div className="circle"></div>
              <div className="title">Todo ({todo.length})</div>
            </div>
            <div className="task-container">

              {todo.map((task) => (
                <div className="task-card" key={task.id}>

                  <div className="flagPriorty-container">
                    <img src={
                        task.priority === "Not-Important_Not-Ergent" ? Priority1 
                        : task.priority === "Not-Important_Ergent" ? Priority2  
                        : task.priority === "Important_Not-Ergent" ? Priority3  
                        : Priority4
                      } alt={task.priority} title={task.priority}/>
                  </div>

                <div className="option popUpMenu">
                  <div className='option-btn popUpMenu' onClick={() => {toggleOption(task.id)}}><Option /></div>
                  <div className="option-container popUpMenu">

                    {popup.taskMore ? 
                      <div id={task.id} className="popup-option hide popUpMenu">
                        <div className="delete popUpMenu" onClick={() => {deleteTask(task.id)}}><GarbageSvg />Delete Task</div>
                      </div>
                    : null}

                  </div>
                </div>

                <div className="title overFlow-text-hide" title={task.title}>{task.title}</div>
                <div className="checkbox-container">

                  {task.checkBox.map((box) => (

                      <div className={`check-box ${box.state === "done" ? "check-box checked" : ""} ${task.checkBox.length === 1 ? "justOne": ""}`} key={box.id} onClick={() => {toggleCheckBox(box.id, task.id)}}>
                        {box.state === "done" ? <img src={CheckImg} alt="check"/> : task.checkBox.length === 1 ? <img src={CheckImg} alt="check"/> : null}
                      </div>

                  ))}

                </div>
                
              </div>
              ))}

            </div>
          </div>

          <div className="done-column">
            <div className="head">
              <div className="circle"></div>
              <div className="title overFlow-text-hide">Done ({done.length})</div>
            </div>
            <div className="task-container">

              {done.map((task) => (
                  <div className="task-card done" key={task.id}>

                    <div className="flagPriorty-container">
                      <img src={
                          task.priority === "Not-Important_Not-Ergent" ? Priority1 
                          : task.priority === "Not-Important_Ergent" ? Priority2  
                          : task.priority === "Important_Not-Ergent" ? Priority3  
                          : Priority4
                        } alt={task.priority} title={task.priority}/>
                    </div>

                  <div className="option popUpMenu">
                    <div className='option-btn popUpMenu' onClick={() => {toggleOption(task.id)}}><Option /></div>
                    <div className="option-container popUpMenu">

                      {popup.taskMore ? 
                        <div id={task.id} className="popup-option hide popUpMenu">
                          <div className="delete popUpMenu" onClick={() => {deleteTask(task.id)}}><GarbageSvg />Delete Task</div>
                        </div>
                      : null}

                    </div>
                  </div>

                  <div className="title overFlow-text-hide" title={task.title}>{task.title}</div>
                  <div className="checkbox-container">

                    {task.checkBox.map((box) => (

                        <div className={`check-box ${box.state === "done" ? "check-box checked" : ""} ${task.checkBox.length === 1 ? "justOne": ""}`} key={box.id}>
                          {box.state === "done" ? <img src={CheckImg} alt="check"/> : null}
                        </div>

                    ))}

                  </div>
                  
                </div>
                ))}

            </div>
          </div>

        </div>
      </div>
  )
}

export default Today