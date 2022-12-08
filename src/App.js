/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import { Goal, History, Home, Intro, Pomodoro, ThisWeek, Today } from "./pages";
import { GoalAdd, Loading_page, Forms, Msg, Navbar, Navbar_intro, Sidebar, TaskAdd, FlowBtn, IntroSection, ShortCuts } from "./components";
import {v4 as uuidV4} from 'uuid'
import Audio1 from './assets/checkAll.mp3'
import Audio2 from './assets/checkTask.mp3'
import unCheck from './assets/unCheck.mp3'
import good from './assets/checkGoal.mp3'
import bad from './assets/unCheckGoal.mp3'
import GoalDone from './assets/GoalDone.mp3'
import TaskComplete from './assets/TaskComplete.mp3'

export const POPUP_ACTIONS = {
  CHECK_INPUT: 'check-input',
  ADD_GOAL: 'add-goal',
  STYLE_INPUT: 'style-input',
  TASK_ADD: 'task-add',
  SET_TASK_DATA: 'set-task-data',
  SET_CURRENT_DAY: 'set-current-day'
}

function executAllAudio() {
  let audio1 = new Audio(Audio1);
  let audio2 = new Audio(Audio2);
  let audio3 = new Audio(unCheck);
  let audio4 = new Audio(good);
  let audio5 = new Audio(bad);
  let audio6 = new Audio(GoalDone);
  let audio7 = new Audio(TaskComplete);
}
executAllAudio();


const App = () => {

  // Variables
  let body = document.querySelector("body");

  const [loading, setLoading] = useState(false);

  // Set Empty Data 
  const [formData, setFormData] = useState([
    {
      "currentUser": "",
      "idUser": "",
      "animation": ""
    }, []
  ]);

  let data = JSON.parse(localStorage.getItem("data")) || formData;

  const [appData, setAppData] = useState(data);

  // If Data updated it well send it to localstorage.
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(appData))
  }, [appData])

  //
  let currentAccount;
  if (appData[0].currentUser === "") {
    currentAccount = [{currentTheme : "light", currentColor: "syan"}]
  } else {
    currentAccount = appData[1].filter(user => user.id === appData[0].idUser)
  }

  let theme = currentAccount[0].currentTheme;
  let color = currentAccount[0].currentColor;

  // Set Current Color & theme
  const [mainTheme, setMainTheme] = useState({theme : theme, color: color});

  // Select Root
  let root = document.querySelector(':root')

  useEffect(() => {
    //
    function setCurrentTheme() {
      if (mainTheme.theme === "light") {
        // light Theme
          root.style.cssText = `--drb-black: #000000;--drb-purple: #6245d9;--drb-yellow: #FFC556;--drb-blue: #00ACFF;--drb-syan: #17E6DB;--drb-Main-Color: var(--drb-${mainTheme.color});--drb-task-done: #3CCC64;--drb-task-undone: #C83936; --drb-primary-bg: #f7f7f7; --drb-secondary-bg: #FFFFFF; --drb-primary-text: #232534; --drb-secondart-text: #5a5a5a; --drb-minTitle: #898989; --drb-lineX025: #AEAEAE; --drb-lineX050: #BABABA; --drb-lineX075: #CDCDCD; --drb-card-bg: #F1F1F1; --drb-card-shadow: #dbdbdb; --drb-sideCard-shadow-top: #ffffff; --drb-sideCard-shadow-bottom: #d7d7d7b8; --drb-input-bg: #E7E7E7; --drb-placeHolder: #A3A3A3; --drb-task-bg: #DADADA; --drb-gradient-overFlow: #00000047; --drb-navText-pomodoro: #676767; --drb-flow-bg: #A1A1A1; --drb-task-bg-hover: #ACACAC; --drb-timer-shadow: #d1d1d133; --drb-background-blur: #ffffff2e; --drb-popup-option-hover: #e3e3e3; --drb-card-goal-done: #e9e9e9; --drb-popUp-shadow: #44444417; --drb-text-shadow_2x: #00000045; --drb-circle-shadow_1x: #0000000d;`;
      } else if (mainTheme.theme === "dark") { 
        // Dark Theme
          root.style.cssText = `--drb-black: #000000;--drb-purple: #6245d9;--drb-yellow: #FFC556;--drb-blue: #00ACFF;--drb-syan: #17E6DB;--drb-Main-Color: var(--drb-${mainTheme.color});--drb-task-done: #3CCC64;--drb-task-undone: #C83936; --drb-primary-bg: #212121; --drb-secondary-bg: #141414; --drb-primary-text: #FFFFFF; --drb-secondart-text: #D9D9D9; --drb-minTitle: #505050; --drb-lineX025: #B4B4B4; --drb-lineX050: #363636; --drb-lineX075: #434343; --drb-card-bg: #2E2E2E; --drb-card-shadow: #0a0a0a; --drb-sideCard-shadow-top: #2c2c2cb8; --drb-sideCard-shadow-bottom: #080808b8; --drb-input-bg: #242424; --drb-placeHolder: #787878; --drb-task-bg: #565656; --drb-gradient-overFlow: #000000; --drb-navText-pomodoro: #676767; --drb-flow-bg: #151515; --drb-task-bg-hover: #404040; --drb-timer-shadow: #03030333; --drb-background-blur: #14141433; --drb-popup-option-hover: #2e2e2e; --drb-card-goal-done: #242424; --drb-popUp-shadow: #030303b5; --drb-text-shadow_2x: #000000ba; --drb-circle-shadow_1x: transparent;`;
      }
    }

    setCurrentTheme();
  }, [mainTheme])
  
  // Show Form 
  const [form, setForm] = useState({visibility: false, CurrentForm: ""})

  // show specific form
  function toggleBetweenForms(e) {
    let value = e.currentTarget.id;
    
    if (value === "signup" || value === "signin" || value === "recover") {
      setForm({visibility: true, CurrentForm: value})
    }

  }

  // Messege for helping user to understand problem
  function createUpMsg(border, text) {
    let span = document.createElement('span');

    if (border === "red") {
      span.style.border = "1px solid var(--drb-task-undone)";
    } else if (border === "green") {
      span.style.border = "1px solid var(--drb-task-done)";
    }

    span.append(document.createTextNode(text))
    document.getElementById("main-msg").append(span)
    setTimeout(() => {
      span.style.opacity = "0";
      span.style.transform = "translateY(-25px)";
      setTimeout(() => {span.remove()}, 600);
    }, 5000);
  }

  // Messoge For Undo Deleting
  function CreateDownMsg(text) {
    
    //
    let oldData = currentAccount[0]
    sessionStorage.setItem('oldData', JSON.stringify(oldData))

    let hideDuration = 6000

    let deleteMsg = document.querySelector('.delete-msg');

    handeMsg()
    
    //
    function handeMsg() {
      if (deleteMsg.classList.contains('show')) {
        setTimeout(() => {handeMsg()}, 500);
      } else {
        // Set Text and animation
        deleteMsg.classList.add("show")
        setTimeout(() => {
          deleteMsg.style.cssText = 'opacity: 1; transform: translateY(0px);';
          setTimeout(() => {
            deleteMsg.style.cssText = 'opacity: 0; transform: translateY(30px);';
            setTimeout(() => {
              deleteMsg.classList.remove("show")
            }, 1000);
          }, hideDuration);
        }, 100);
        let textField = document.querySelector('.delete-name').textContent = text;
      }
    }

  }


  // Set Popup obj
  const [popup, setPopup] = useState({Account: false, Reward: false, goalOption: false, taskOption: false, taskMore: false});

  //
  function togglePopup(e) {
    switch (e) {

      case "account":
        popup.Account ? setPopup({...popup, Account: false}) : setPopup({...popup, Account: true});
      break;
        
      case "reward":
        popup.Reward ? setPopup({...popup, Reward: false}) : setPopup({...popup, Reward: true});
      break;
        
      case "goal-option":
        popup.goalOption ? setPopup({...popup, goalOption: false}) : setPopup({...popup, goalOption: true});
      break;

      case "taskInput-option":
        popup.taskOption ? setPopup({...popup, taskOption: false}) : setPopup({...popup, taskOption: true});
      break;

    }
  }

  useEffect(() => {
    let handler = (e) => {
        if (!e.target.classList.value.includes("popUpMenu")) {
          if (popup.Account || popup.Reward || popup.goalOption || popup.taskOption || popup.taskMore) {
            setPopup({Account: false, Reward: false, goalOption: false, taskOption: false, taskMore: false});

          }
        } else {
        }
    }

    body.addEventListener("click", handler);

    return () => {
      body.removeEventListener("click", handler);
    }
  })

  //
  function logOut() {
    setMainTheme({...mainTheme, color: 'syan'})
    setLoading(true)
    setPopup({...popup, Account: false})
    setTimeout(() => {
      setAppData([{"currentUser": "", "idUser": "", "animation": ""}, appData[1]])
      setLoading(false)
    }, 2000);
  }

  // Ranking Tasks By Priority
  function rankingTask() {
    let thisWeek = currentAccount[0].thisWeek;

    let priority1;
    let priority2;
    let priority3;
    let priority4;

    for (let day in thisWeek) {
      if (thisWeek[day].length !== 0) {
        priority1 = thisWeek[day].filter(task => task.priority === "Important_Ergent")
        priority2 = thisWeek[day].filter(task => task.priority === "Important_Not-Ergent")
        priority3 = thisWeek[day].filter(task => task.priority === "Not-Important_Ergent")
        priority4 = thisWeek[day].filter(task => task.priority === "Not-Important_Not-Ergent")
        priority1.push(...priority2)
        priority1.push(...priority3)
        priority1.push(...priority4)
        thisWeek[day] = priority1;
      }
    }
  }
  rankingTask();

  // Set Current Section 
  const [currentSection, setCurrentSection] = useState("");

  // apdate data 
  function apdateData(prop, value) {
    let arrayOfUsers = appData[1].filter(user => user.id !== appData[0].idUser);
    let arrayOfUser = appData[1].filter(user => user.id === appData[0].idUser);
    if (prop === "currentColor") {
      arrayOfUser[0].currentColor = value;
    }
    if (prop === "currentTheme") {
      arrayOfUser[0].currentTheme = value;
    }
    arrayOfUsers.push(arrayOfUser[0]);
    setAppData([appData[0], arrayOfUsers]);
  }

  // Set vibration animation to wrong input
  function inputAnimation(input) {
    let currentInput = document.querySelector(`.${input}`)
    currentInput.style.border = "1px solid var(--drb-task-undone)";
    currentInput.parentElement.children[1].style.color = "var(--drb-task-undone)";
    if (input === "signUp-password" || input === "signIn-password" || input === "forget-password") {
      currentInput.parentElement.children[2].style.filter = "invert(80%) sepia(109%) saturate(1627%) hue-rotate(338deg) brightness(101%) contrast(102%)";
    }
    currentInput.parentElement.style.animation = "vibration .5s";
    setTimeout(() => {
      currentInput.parentElement.style.animation = "unset";
    }, 600);
  }

  //
  function displayLoader(e, msg, delay) {
    // msg report
    setTimeout(() => {
      createUpMsg("green", msg)
    }, delay);
    // display the loader
    document.getElementById('btn-img').style.display = "block";
    document.getElementById('btn-text').style.display = "none";
    e.target.style.pointerEvents = "none";
    setTimeout(() => {
      document.getElementById('btn-img').style.display = "none";
      document.getElementById('btn-text').style.display = "block";
      e.target.style.pointerEvents = "unset";
    }, delay - 50);
  }

  //
  let bronze = "";
  let gold = "";
  let diamond = "";
  let percent = "";

  if (appData[0].currentUser !== "") {
    bronze = currentAccount[0].todayProgress.bronze;
    gold = currentAccount[0].todayProgress.gold;
    diamond = currentAccount[0].todayProgress.diamond;
    percent = currentAccount[0].todayProgress.percent;
  }

  // set reward values
  const [reward, setReward] = useState({bronze: bronze, gold: gold, diamond: diamond, percent: percent});

  useEffect(() => {
    if (appData[0].currentUser !== "") {
      let currentData = appData[0];
      let arrayOfUsers = appData[1].filter(user => user.id !== currentData.idUser)
      let arrayOfUser = appData[1].filter(user => user.id === currentData.idUser)
      arrayOfUser[0].todayProgress = reward;
      arrayOfUsers.push(arrayOfUser[0]);
      setAppData([currentData, arrayOfUsers])
    }
  }, [reward, setReward])

  function updateWeekPercent() {
    if (appData[0].currentUser !== "") {
      let result = 0;
      let week = currentAccount[0].thisWeek;
      let NotEmptyWeek = 0;
      Object.keys(week).forEach(day => {
        if (week[day].length > 0) {
          NotEmptyWeek++;
          let completedTask = week[day].filter(task => task.state === "done").length;
          let allTaskSize = week[day].length
          let percent = completedTask * 100 / allTaskSize
          result = result + percent
        }
      })
      if (NotEmptyWeek !== 0) {
        result = Math.round(result / NotEmptyWeek);
      }

      currentAccount[0].currentWeek.percent = result
    }
  }
  updateWeekPercent()

  // Reset Week Array If Current Day Is Monday. 
  function resetWeek() {

    const arrayDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

    let date = new Date();

    let todayDate = new Date(date.setDate(date.getDate())).toString().slice(4, 15)

    let todayDay = date.getDay() === 0 ? "sunday" : arrayDays[date.getDay() - 1]

    let thisWeek = currentAccount[0].thisWeek
    
    if (appData[0].currentUser !== "") {
      
      if (todayDate !== currentAccount[0].currentWeek[todayDay]) {

        // Set Undone To Todo Task 
        for (const day in thisWeek) {
          thisWeek[day].forEach(task => {
            if (task.state === 'todo') {
              task.state = 'undone';
            }
          })
        }

        // Set Passed Week To History
        currentAccount[0].history.push({
          'Date': `From ${currentAccount[0].currentWeek.monday} To ${currentAccount[0].currentWeek.sunday}`,
          "WeekArchive": currentAccount[0].thisWeek,
          "percent": currentAccount[0].currentWeek.percent
        });

        // Set New Week
        currentAccount[0].thisWeek = {
          monday : [],
          tuesday : [],
          wednesday : [],
          thursday : [],
          friday : [],
          saturday : [],
          sunday : []
        };
        currentAccount[0].currentWeek = {
          'monday': getAllWeekDays(0),
          'tuesday': getAllWeekDays(1),
          'wednesday': getAllWeekDays(2),
          'thursday': getAllWeekDays(3),
          'friday': getAllWeekDays(4),
          'saturday': getAllWeekDays(5),
          'sunday': getAllWeekDays(6)
        }
      }

    }

  }
  resetWeek();

  //
  const [inputPopUp, setInputPopUp] = useState({goalPopUp: false, taskPopUp: false});

  function switchInputPopUp(popup) {
    if (popup === "goal") {
      setInputPopUp({goalPopUp: !inputPopUp.goalPopUp, taskPopUp: false})
      setPassAdd({input1: false, input2: false, input3: false});
    }
    if (popup === "task") {
      setInputPopUp({goalPopUp: false, taskPopUp: !inputPopUp.taskPopUp})
      setPassAdd({input1: false, input2: false, input3: false, input4: false});
    }
  }

  // passing add on inputs popup
  const [passAdd, setPassAdd] = useState({input1: false, input2: false, input3: false, input4: false});

  // 
  const [taskData, setTaskData] = useState({id: uuidV4(), title: "", priority: "", checkBox: [], state: "todo", taskPercent: 0})
  
  //
  function popupAction(type, e, priority, daysToAddTask) {

    let targetValue = e.target.value;
    let targetClass = e.target.classList.value;
  
    switch (type) {
  
      case POPUP_ACTIONS.CHECK_INPUT: 

        switch (targetClass) {

          case "goal-input": 
          case "task-input": 
            if (targetValue !== "" && targetValue.length <= 60) {
              setPassAdd({...passAdd, input1: true})
            }else if (targetValue.length > 20) {
              setPassAdd({...passAdd, input1: false})
              createUpMsg("red", "Name is Too Long (Max 60)");
              inputAnimation(targetClass);
            } else {
              setPassAdd({...passAdd, input1: false})
            }
          break;

          case "days-input":
            if (targetValue !== "" && targetValue >= 5 && targetValue <= 120) {
              setPassAdd({...passAdd, input2: true})
            } else if (targetValue !== "") {
              if (targetValue < 5 || targetValue > 120) {
                createUpMsg("red", "Number is Not Valid");
                inputAnimation(targetClass);
                setPassAdd({...passAdd, input2: false})
              }
            } else {
              setPassAdd({...passAdd, input2: false})
            }
          break;

          case "inputPry popUpMenu":
            if (targetValue !== "" && targetValue > 0 && targetValue <= 20) {
              setPassAdd({...passAdd, input3: true})
            } else if (targetValue !== "") {
              if (targetValue <= 0 || targetValue > 20) {
                createUpMsg("red", "Number is Not Valid");
                inputAnimation("inputPry");
                setPassAdd({...passAdd, input3: false})
              }
            }
          break;

        }

      break;

      case POPUP_ACTIONS.STYLE_INPUT: 

        switch (targetClass) {

          case "goal-input":
          case "days-input":
            if (targetValue !== "") {
              e.target.style.border = "1px solid var(--drb-Main-Color)";
              e.target.style.backgroundColor = "var(--drb-card-bg)";
              e.target.style.color = "var(--drb-primary-text)";
            } else {
              e.target.style.border = "";
              e.target.style.backgroundColor = "";
            }
            break;
            
            case "task-input":
              if (targetValue !== "") {
                e.target.style.border = "1px solid var(--drb-Main-Color)";
                e.target.style.backgroundColor = "var(--drb-card-bg)";
                e.target.parentElement.children[1].children[0].style.display = "inline-block";
                e.target.style.color = "var(--drb-primary-text)";
              } else {
                e.target.style.border = "";
                e.target.parentElement.children[1].children[0].style.display = "none";
                e.target.style.backgroundColor = "";
              }
            break;

            case "inputPry popUpMenu":
              if (targetValue !== "") {
                e.target.style.border = "1px solid var(--drb-Main-Color)";
                e.target.style.backgroundColor = "var(--drb-card-bg)";
                e.target.style.color = "var(--drb-primary-text)";
              } else {
                e.target.style.border = "";
                e.target.style.backgroundColor = "";
              }
            break;

        }

      break;

      case POPUP_ACTIONS.ADD_GOAL:

        let input1Value = e.target.parentElement.children[0].children[1].value.trim();
        let input2Value = parseInt(e.target.parentElement.children[1].children[1].value);

        displayLoader(e, "Goal created successfully", 200);

        let daysGoal = [];
        for (let i = 1; i <= input2Value; i++) {
          let day = {id: uuidV4(), state: ""};
          daysGoal.push(day);
        }
        let goal = {id: uuidV4(), title: input1Value, days: daysGoal, goalRate: 0, goalComplete: 0, itsDone: false, startAt: "", endAt: ""}

        // Set Start Date
        goal.startAt = new Date().toString().slice(4, 15)

        setTimeout(() => {
          let arrayOfUser = appData[1].filter(user => user.id !== appData[0].idUser);
          let user = appData[1].filter(user => user.id === appData[0].idUser);
          user[0].goals.push(goal);
          arrayOfUser.push(user[0]);
          setAppData([appData[0], arrayOfUser]);
          switchInputPopUp("goal");
        }, 1000);
        
      break;
  
      case POPUP_ACTIONS.SET_TASK_DATA:

        switch (targetClass.slice(0, 8)) {

          case "task-inp":
            setTaskData({...taskData, title: targetValue,})
          break;

          case "priority":
            setTaskData({...taskData, priority: priority,})
            setPassAdd({...passAdd, input2: true})
          break;

          case "inputPry":
            let checkBox = [];
            for (let i = 1; i <= targetValue; i++) {
              let objBox = {id: uuidV4(), state: "undone"}
              checkBox.push(objBox);
            }
            setTaskData({...taskData, checkBox: checkBox,})
          break;

        }

      break;

      case POPUP_ACTIONS.TASK_ADD:

        // if data come from task add
        if (targetClass.includes("todayInput")) {

          let currentDay = document.querySelector(".title-section span").textContent;

          displayLoader(e, "Task created successfully", 500);

          setTimeout(() => {
            currentAccount[0].thisWeek[currentDay].push(taskData);
              
            updateProgressDay(currentAccount[0].thisWeek[currentDay]);
            
            let otherUsers = appData[1].filter(user => user.id !== appData[0].idUser);
            otherUsers.push(...currentAccount)
            setAppData([appData[0], otherUsers])
            setTaskData({id: uuidV4(), title: "", priority: "", checkBox: [], state: "todo", taskPercent: 0})
            //
            switchInputPopUp("task");
          }, 1000);
        }

        // if data come from this week
        if (targetClass.includes("weekInput")) {
          // set value to null
          document.querySelector('.task-input').value = '';
          document.querySelector('.task-input').style.cssText = ''
          document.querySelector('.input-container .info-btn svg').style.cssText = ''
          document.querySelector('.inputPry').value = '';

          //
          let priorityArray = document.querySelectorAll('.priority img')
          // remove active class
          priorityArray.forEach(link => {
              link.classList.remove('active');
          })

          //
          let daysArray = document.querySelectorAll('.chose-day .day')
          // remove active class
          daysArray.forEach(link => {
              link.classList.remove('active');
          })

          displayLoader(e, "Task created successfully", 500);

          setTimeout(() => {

            daysToAddTask.forEach(day => {
              taskData.id = uuidV4();
              let newTaskData = {...taskData, id: uuidV4()}

              if (taskData !== newTaskData) {
                currentAccount[0].thisWeek[day].push(newTaskData)
              }
            })
            
            let otherUsers = appData[1].filter(user => user.id !== appData[0].idUser);
            otherUsers.push(...currentAccount)
            setAppData([appData[0], otherUsers])
            setTaskData({id: uuidV4(), title: "", priority: "", checkBox: [], state: "todo", taskPercent: 0})

          }, 1000);
          //
          setPassAdd({input1: false, input2: false, input3: false, input4: false});
        }

        break;
        
      }
    }

  // 
  const [goal, setGoal] = useState("");

  //
  function setGoalData(goalId) {
    let goal = currentAccount[0].goals.filter(goal => goal.id === goalId);
    setGoal(...goal);
  }

  //
  function deleteGoal(goalId) {
    let myGoal;
    let goals;
    if (goalId !== undefined) {
      myGoal = currentAccount[0].goals.filter(goalr => goalr.id === goalId);
      goals = currentAccount[0].goals.filter(goalr => goalr.id !== goalId);
    } else {
      myGoal = currentAccount[0].goals.filter(goalr => goalr.id === goal.id)
      goals = currentAccount[0].goals.filter(goalr => goalr.id !== goal.id);
      setCurrentSection("");
    }
    CreateDownMsg(myGoal[0].title);

    let otherUsers = appData[1].filter(user => user.id !== appData[0].idUser);
    currentAccount[0].goals = goals;
    otherUsers.push(...currentAccount);
    setAppData([appData[0], otherUsers]);
    let titleSpan = document.querySelector('.title-section span');
    titleSpan.textContent = "";
  }
  
  function updateDays(state, dayId) {
    let otherUsers = appData[1].filter(user => user.id !== appData[0].idUser);
    let otherGoals = currentAccount[0].goals.filter(goalr => goalr.id !== goal.id);
    let myGoal = currentAccount[0].goals.filter(goalr => goalr.id === goal.id);
    let days = myGoal[0].days;
    let myDay = myGoal[0].days.filter(day => day.id === dayId);
    myDay[0].state = state;
    let indexOfMyDay = days.indexOf(myDay[0]);
    let firstHalfArray = days.slice(0, indexOfMyDay);
    let SecondHalfArray = days.slice(indexOfMyDay + 1);
    if (state === 'finish') {
      // play done sound
      let audio = new Audio(good);
      audio.play()
    } else {
      // play done sound
      let audio = new Audio(bad);
      audio.play()
    }
    firstHalfArray.push(...myDay);
    firstHalfArray.push(...SecondHalfArray);
    myGoal[0].days = firstHalfArray;

    let finishedDays = firstHalfArray.filter(day => day.state === "finish").length;
    let finishResult = Math.round(finishedDays * 100 / days.length);
    myGoal[0].goalRate = finishResult
    
    let completeDays = firstHalfArray.filter(day => day.state !== "").length;
    let completeResult = Math.round(completeDays * 100 / days.length);
    myGoal[0].goalComplete = completeResult

    if (firstHalfArray.filter(day => day.state === "").length === 0) {
      myGoal[0].itsDone = true;
      myGoal[0].endAt = new Date().toString().slice(4, 15);
      setTimeout(() => {
        setCurrentSection("");
        // play sound
        let audio = new Audio(GoalDone);
        audio.play()
      }, 500);
    }

    otherGoals.unshift(...myGoal);
    currentAccount[0].goals = otherGoals;
    otherUsers.push(...currentAccount);
    setAppData([appData[0], otherUsers]);
  }

  //
  function deleteTask(taskId, currentDayBy) {

    let currentDay;
    
    if (currentDayBy === undefined) {
      currentDay = document.querySelector(".title-section span").textContent;
    } else {
      currentDay = currentDayBy
    }

    let myTask = currentAccount[0].thisWeek[currentDay].filter(task => task.id === taskId);

    CreateDownMsg(myTask[0].title)

    let otherUsers = appData[1].filter(user => user.id !== appData[0].idUser);

    let newDay = currentAccount[0].thisWeek[currentDay].filter(task => task.id !== taskId);

    currentAccount[0].thisWeek[currentDay] = newDay
    //
    updateProgressDay(currentAccount[0].thisWeek[currentDay]);
    otherUsers.push(...currentAccount)
    setAppData([appData[0], otherUsers])

  }

  function toggleCheckBox(boxId, taskId) {
    let currentDay = document.querySelector(".title-section span").textContent;
    let currentDayArray = currentAccount[0].thisWeek[currentDay];
    let otherUsers = appData[1].filter(user => user.id !== appData[0].idUser);
    let myTask = currentDayArray.filter(task => task.id === taskId);
    let indexOfMyTask = currentDayArray.indexOf(myTask[0]);
    let firstHalfArray = currentDayArray.slice(0, indexOfMyTask);
    let SecondHalfArray = currentDayArray.slice(indexOfMyTask + 1);
    let otherBoxs = myTask[0].checkBox.filter(box => box.id !== boxId);
    let myBox = myTask[0].checkBox.filter(box => box.id === boxId);
    myBox[0].state = myBox[0].state === "undone" ? "done" : "undone";
    
    myBox[0].state === "undone" ? otherBoxs.push(...myBox) : otherBoxs.unshift(...myBox);

    myTask[0].checkBox = otherBoxs;

    // Check if All CheckBoxs is Done
    let checkBoxUndone = myTask[0].checkBox.filter(box => box.state === "undone");
    if (checkBoxUndone.length === 0) {
      myTask[0].state = "done"
    }
    //
    if (myBox[0].state === 'done' && checkBoxUndone.length !== 0) {
      // play done sound
      let audio = new Audio(Audio1);
      audio.play();
    } else if (myBox[0].state === 'done' && checkBoxUndone.length === 0) {
      // play Complete sound
      let audio = new Audio(TaskComplete);
      audio.play();
    } else {
      // play done sound
      let audio = new Audio(unCheck);
      audio.play();
    }

    let boxDone = myTask[0].checkBox.filter(box => box.state === "done").length

    let donePercent = boxDone * 100 / myTask[0].checkBox.length;

    myTask[0].taskPercent = donePercent;

    firstHalfArray.push(...myTask)
    firstHalfArray.push(...SecondHalfArray)

    updateProgressDay(firstHalfArray);

    currentAccount[0].thisWeek[currentDay] = firstHalfArray
    otherUsers.push(...currentAccount)
    setAppData([appData[0], otherUsers])
  }

  function updateProgressDay(taskArray) {
    let allPercent = 0;

    taskArray.forEach(task => {
      allPercent = allPercent + task.taskPercent;
    })

    let result = parseInt(allPercent / taskArray.length);

    setReward({...reward, percent: result}) 
  } 

  function toggleOption(id) {

    setPopup({...popup, taskMore: true});
    
    setTimeout(() => {
      let popupOption = document.getElementById(id);
      popupOption.classList.toggle('hide');
    }, 50);
    
  }

  function checkAllTasks(day, state) {
    let otherUsers = appData[1].filter(user => user.id !== appData[0].idUser);
    let arrayTasks = currentAccount[0].thisWeek[day];
    if (arrayTasks.length !== 0) {
      arrayTasks.forEach(task => {
        task.state = state;
        task.taskPercent = state === 'done' ? 100 : 0;
        task.checkBox.forEach(checkBox => {
          state === 'done' ? checkBox.state = 'done' : checkBox.state = 'undone';
        })
      })
      otherUsers.push(...currentAccount)
      setAppData([appData[0], otherUsers])
    }

    //
    if (state === 'done') {
      // play done sound
      let audio = new Audio(Audio1);
      audio.play();
    } else {
      // play done sound
      let audio = new Audio(unCheck);
      audio.play();
    }
  }

  function checkOneTask(day, id) {
    let otherUsers = appData[1].filter(user => user.id !== appData[0].idUser);
    let arrayTasks = currentAccount[0].thisWeek[day];
    let Task = arrayTasks.filter(task => task.id === id);
    if (Task[0].state === 'done') {
      Task[0].state = 'todo'
      Task[0].taskPercent = 0;
      Task[0].checkBox.forEach(checkBox => {
        checkBox.state = 'undone';
      })
      // play done sound
      let audio = new Audio(unCheck);
      audio.play();
    } else {
      Task[0].state = 'done'
      Task[0].taskPercent = 100;
      Task[0].checkBox.forEach(box => {
        box.state = 'done';
      })
      // play done sound
      let audio = new Audio(Audio2);
      audio.play();
    }
    otherUsers.push(...currentAccount)
    setAppData([appData[0], otherUsers])
    
  }



  // Set Undone To Tasks That Passed!
  function setUndone(array) {
    array.forEach(day => {
      currentAccount[0].thisWeek[day].forEach(task => {
        if (task.state === 'todo') {
          task.state = 'undone';
        }
      })
    })
  }

  //
  function getAllWeekDays(num) {
    let date = new Date();
    let mondayDate = date.getDate() - date.getDay() + 1;
    let anotherDay = mondayDate + num;
    let finalDate = new Date(date.setDate(anotherDay)).toString();
    return finalDate.slice(4, 15);
  }

  // Pomodoro Settings
  const [showSettings, setShowSettings] = useState(false);

  //
  function updatePomodoro(obj) {
    let otherUsers = appData[1].filter(user => user.id !== appData[0].idUser);
    otherUsers.push(obj);
    setAppData([appData[0], otherUsers])
  }

  function UndoDelete() {
    let oldData = JSON.parse(sessionStorage.getItem('oldData'));
    let otherUsers = appData[1].filter(user => user.id !== appData[0].idUser);
    otherUsers.push(oldData)
    setAppData([appData[0], otherUsers])
    if (currentSection === 'thisWeek') {
      setCurrentSection('');
      window.location.reload();
    }
  }


  return (
    <div className='app'>
      {loading ? <Loading_page /> : null}
      <Msg UndoDelete={UndoDelete}/>
      {appData[0].currentUser === "" ? <Navbar_intro mainTheme={mainTheme} setMainTheme={setMainTheme} toggleBetweenForms={toggleBetweenForms}/> : null}
      {appData[0].currentUser === "" ? <Intro /> : null}
      {form.visibility ? <Forms form={form} setForm={setForm} toggleBetweenForms={toggleBetweenForms} appData={appData} createUpMsg={createUpMsg} setAppData={setAppData} setLoading={setLoading} inputAnimation={inputAnimation} displayLoader={displayLoader} getAllWeekDays={getAllWeekDays}/> : null }
      {appData[0].currentUser !== "" ? <Navbar appData={appData} mainTheme={mainTheme} setMainTheme={setMainTheme} popup={popup} togglePopup={togglePopup} apdateData={apdateData} currentSection={currentSection} logOut={logOut}/> : null}
      {appData[0].currentUser !== "" ? <Sidebar appData={appData} setCurrentSection={setCurrentSection} userProfile={currentAccount} setGoalData={setGoalData} updateProgressDay={updateProgressDay}/> : null}
      {appData[0].currentUser !== "" ? 
      <div className='content'>
        {inputPopUp.goalPopUp ? <GoalAdd popupAction={popupAction} passAdd={passAdd} createUpMsg={createUpMsg} switchInputPopUp={switchInputPopUp}/> : null}
        {inputPopUp.taskPopUp ? <TaskAdd switchInputPopUp={switchInputPopUp} popup={popup} togglePopup={togglePopup} popupAction={popupAction} passAdd={passAdd} createUpMsg={createUpMsg}/> : null}
        <FlowBtn switchInputPopUp={switchInputPopUp} currentSection={currentSection} showSettings={showSettings} setShowSettings={setShowSettings}/>
        {currentSection === "" ? <IntroSection appData={appData}/> : null}
        {currentSection === "home" ? <Home popup={popup} togglePopup={togglePopup} reward={reward} setReward={setReward} userProfile={currentAccount} toggleOption={toggleOption} deleteGoal={deleteGoal}/> : null}
        {currentSection === "goal" ? <Goal popup={popup} togglePopup={togglePopup} goal={goal} deleteGoal={deleteGoal} updateDays={updateDays}/> : null}
        {currentSection === "today" ? <Today popup={popup} setPopup={setPopup} currentAccount={currentAccount} deleteTask={deleteTask} toggleCheckBox={toggleCheckBox} toggleOption={toggleOption}/> : null}
        {currentSection === "thisWeek" ? <ThisWeek popup={popup} togglePopup={togglePopup} popupAction={popupAction} passAdd={passAdd} createUpMsg={createUpMsg} setPassAdd={setPassAdd} toggleOption={toggleOption} deleteTask={deleteTask} currentAccount={currentAccount} checkAllTasks={checkAllTasks} checkOneTask={checkOneTask} setUndone={setUndone}/> : null}
        {currentSection === "pomodoro" ? <Pomodoro showSettings={showSettings} setShowSettings={setShowSettings} userProfile={currentAccount[0]} createUpMsg={createUpMsg} updatePomodoro={updatePomodoro}/> : null}
        {currentSection === "history" ? <History userProfile={currentAccount[0]}/> : null}
        <ShortCuts currentSection={currentSection} switchInputPopUp={switchInputPopUp}/>
      </div>
      : null}
    </div>
  );
}

export default App;
