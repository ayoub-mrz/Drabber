/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react'
import InputTask from './../../components/input-task/InputTask'
import CardDay from './../../components/card_day/Card_day'
import MockopCard from './../../assets/Mockup_Card'
import CheckImg from './../../assets/check.png'
import Priority1 from './../../assets/Not-Important_Not-Ergent.png'
import Priority2 from './../../assets/Not-Important_Ergent.png'
import Priority3 from './../../assets/Important_Not-Ergent.png'
import Priority4 from './../../assets/Important_Ergent.png'
import Option from './../../assets/Ellipsis'
import GarbageSvg from './../../assets/TrashSvg'
import { useEffect } from 'react'

function ThisWeek( {popup, togglePopup, popupAction, passAdd, createUpMsg, setPassAdd, toggleOption, deleteTask, currentAccount, checkAllTasks, checkOneTask, setUndone} ) {

  const [week, setWeek] = useState(currentAccount[0].thisWeek)

  const cardList = Object.keys(week).map((day) => {
    return <CardDay title={day} array={week[day]} getClickedDay={getClickedDay} key={day}/>
  })
  //
  const [infoArray, setInfoArray] = useState('');

  //
  const [currentDayBy, setCurrentDayBy] = useState('');

  //
  function getClickedDay(day) {
    setCurrentDayBy(day)
    setInfoArray(week[day]);
  }

  // update InfoArray When Add Task 
  useEffect(() => {
    if (currentDayBy !== "") {
      getClickedDay(currentDayBy)
    }
  }, [currentAccount])

  let taskDoneNum
  if (Array.isArray(infoArray)) {
    taskDoneNum = infoArray.filter(task=> task.state === "done").length;
  } else {
    taskDoneNum = 0;
  }

  const arrayDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  const arrayMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let date = new Date();
  let localDay = arrayDays[date.getDay()];


  let indexOfCurrentDayBy = arrayDays.indexOf(currentDayBy)
  let indexOfLocalDay= arrayDays.indexOf(localDay)

  let headDay = '';

  if (indexOfLocalDay === 0) {
    indexOfCurrentDayBy === indexOfLocalDay + 5 ? headDay = 'yesterday' 
    : indexOfCurrentDayBy === indexOfLocalDay + 6 ? headDay = 'today'
    : headDay = currentDayBy
  } else {
    indexOfCurrentDayBy === indexOfLocalDay - 2 ? headDay = 'yesterday' 
    : indexOfCurrentDayBy === indexOfLocalDay - 1 ? headDay = 'today'
    : indexOfCurrentDayBy === indexOfLocalDay  ? headDay = 'tomorow'
    : headDay = currentDayBy
  }

  function getAllWeekDays(num) {
    let mondayDate = date.getDate() - date.getDay() + 1;
    let anotherDay = mondayDate + num;
    let finalDate = new Date(date.setDate(anotherDay)).toUTCString();
    let month = arrayMonths.filter(title => title.includes(finalDate.slice(8, 11)));
    return finalDate.slice(5, 7) + " " + month[0];
  }

  getAllWeekDays(2)

  const daysObj = {
    "monday": getAllWeekDays(0),
    "tuesday": getAllWeekDays(1),
    "wednesday": getAllWeekDays(2),
    "thursday": getAllWeekDays(3),
    "friday": getAllWeekDays(4),
    "saturday": getAllWeekDays(5),
    "sunday": getAllWeekDays(6),
  }

  let state;

  if (infoArray.length === taskDoneNum && infoArray.length > 0) { // Thats means its All Task In Array is done
    state = 'todo' 
  } else {
    state = 'done'
  }

  // Set Blur On past Days
  let pastDays = arrayDays.slice(0, arrayDays.indexOf(localDay) - 1);
  pastDays.forEach(day => {
    let dayCard =  document.querySelector(`.cards-days-container .${day}`);
    if (dayCard !== null) {
      dayCard.classList.add('blur');
      dayCard.setAttribute('title', 'Passed Day');
    }
  })
  
  //
  setUndone(pastDays);

  return (
    <div className='thisWeekSection'>
      <div className="thisWeek-container">
        <div className="inputCtn">
          <InputTask popup={popup} togglePopup={togglePopup} popupAction={popupAction} passAdd={passAdd} createUpMsg={createUpMsg} days={true} setPassAdd={setPassAdd}/>
        </div>
        <div className="cards-days-container">

          {cardList}

        </div>
      </div>
      <div className="info-container">

        {!Array.isArray(infoArray) ? 
        <div className="detail-mockup">
          <MockopCard />
          <p>Click on of the cards to show her content.</p>
        </div>
        : 
        <div className='wide'>

          <div className="info-head">
            <div className={state === 'todo' ? "checkbox done" : "checkbox"} title='Check / Uncheck All Tasks' onClick={() => {checkAllTasks(currentDayBy, state)}}><img src={CheckImg} alt="" /></div>
            <div className="line"></div>
            <p className="currentDay">{headDay}, {daysObj[`${currentDayBy}`]}</p>
            <span className="doneNum">{taskDoneNum}/{infoArray.length}</span>
          </div>

          <div className="info-task-container">

            {
              infoArray.map(task => (

                <div className="task" key={task.id}>
                  <div className={`task-content ${task.state}`}>
                    <div className={`checkbox ${task.state}`} title='Check / Uncheck Task' onClick={() => {checkOneTask(currentDayBy, task.id)}}><img src={CheckImg} alt="" /></div>
                    <div className="line"></div>
                    <p className='overFlow-text-hide'>{task.title}</p>
    
                    <div className="option popUpMenu">
                      <div className='option-btn popUpMenu' onClick={() => {toggleOption(task.id)}}><Option /></div>
                      <div className="option-container popUpMenu">
    
                        {popup.taskMore ? 
                          <div id={task.id} className="popup-option hide popUpMenu">
                            <div className="delete popUpMenu" onClick={() => {deleteTask(task.id, currentDayBy); getClickedDay(currentDayBy)}}><GarbageSvg />Delete Task</div>
                          </div>
                        : null}
    
                      </div>
                    </div>
    
                  </div>
                  <div className="task-priority">
                    <img src={
                      task.priority === "Not-Important_Not-Ergent" ? Priority1 
                      : task.priority === "Not-Important_Ergent" ? Priority2  
                      : task.priority === "Important_Not-Ergent" ? Priority3  
                      : Priority4
                    } alt={task.priority} title={task.priority}/>
                  </div>
                </div>
    
              ))
            }

          </div>
        </div>
        }



      </div>
    </div>
  )
}

export default ThisWeek