import React, { useState } from 'react'
import LogoSvg from '../../assets/LogoSvg';
import Close from './../../assets/Close';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RecoverPassword from './RecoverPassword';
import {v4 as uuidV4} from 'uuid' 


export const FORM_ACTIONS =  {
  MOVE_PLACEHOLDER: 'move-placeholder',
  TOGGLE_PASSWORD_TEXT: 'toggle-password-text',
  FOCUS_TO_FIELD: 'focus-to-field',
  CLOSE_FORM: 'close-form',
  ADD_FORM_DATA: 'add-form-data',
  CHECK_INPUT: 'check-input',
  ADD_USER: 'add-user',
  LOG_IN: 'log-in',
  CHANGE_PASSWORD: 'change-password'
  }

function Forms( {form, setForm, toggleBetweenForms, appData, setAppData, createUpMsg, setLoading, inputAnimation, displayLoader, getAllWeekDays} ) {


  // Set passing 
  let [passSubmit, setPassSubmit] = useState({name: false, password: false, age: false});

  // Set Current Account 
  const [currentAccount, setCurrentAccount] = useState({});

  // Create User Account
  const [formData, setFormData] = useState({
    "id": uuidV4(),
    "userName": "",
    "password": "",
    "age": "",
    "goals": [],
    "thisWeek": {
      monday : [],
      tuesday : [],
      wednesday : [],
      thursday : [],
      friday : [],
      saturday : [],
      sunday : []
    },
    "pomodoro": {pomodoro: 25, short: 5, long: 30, every: 4},
    "history": [],
    'currentWeek': {
      'monday': getAllWeekDays(0),
      'tuesday': getAllWeekDays(1),
      'wednesday': getAllWeekDays(2),
      'thursday': getAllWeekDays(3),
      'friday': getAllWeekDays(4),
      'saturday': getAllWeekDays(5),
      'sunday': getAllWeekDays(6),
      "percent": ""
    },
    "currentColor": "syan",
    "currentTheme": "light",
    "todayProgress": {bronze: 40, gold: 50, diamond: 60, percent: 0}
  }) 


  // function take type of action and select event click.
  function clickAction(type, e) {
    let target = e.target;
    let targetClass = target.classList.value;
    let targetValue = target.value;


    switch (type) {
      case FORM_ACTIONS.CLOSE_FORM: 
        setForm({visibility: false, CurrentForm: ""});
      break;
      
      case FORM_ACTIONS.MOVE_PLACEHOLDER: 
        if (targetValue !== '') {
          target.style.cssText = "background-color: var(--drb-primary-bg); border: 1px solid var(--drb-Main-Color);";
          target.parentElement.children[1].style.cssText = "font-size: .9em; color: var(--drb-Main-Color); top: 0; background-color: var(--drb-primary-bg); padding-inline: .15rem; height: 20px;"
          if (targetClass.includes("password") ) {
            target.parentElement.children[2].style.display = 'block';
            target.parentElement.children[2].style.filter = "unset";
          }
        } else {
          target.style.cssText = "";
          target.parentElement.children[1].style.cssText = "";
          if (targetClass.includes("password") ) {
            target.parentElement.children[2].style.display = 'none';
          }
        }
      break;

      case FORM_ACTIONS.FOCUS_TO_FIELD:
        target.parentElement.children[0].focus();
      break;

      case FORM_ACTIONS.TOGGLE_PASSWORD_TEXT:
        if (target.parentElement.children[0].type === 'password') {
          target.parentElement.children[0].type = 'text';
        } else {
          target.parentElement.children[0].type = 'password';
        }
      break;

      case FORM_ACTIONS.ADD_FORM_DATA:

        switch (targetClass) {

          case "signUp-name":

            setFormData({...formData, userName: targetValue.trim()})
            
            break;
            
            case "signUp-password":
              
              setFormData({...formData, password: targetValue.trim()})
              
              break;
              
              case "signUp-age":
                
                setFormData({...formData, age: targetValue})

          break;

        }

      break;

      case FORM_ACTIONS.CHECK_INPUT:
        switch (targetClass) {
          case "signUp-name": 

            if (targetValue !== "" && targetValue.length <= 20) {

              // Check if UserName is Already exist
              let data = appData[1];
              if (data !== []) {
                let dataFilter = data.filter(x => x.userName === targetValue.trim())
                if (dataFilter.length > 0) {
                  // show msg about the problem
                  createUpMsg("red", 'This name is already taken.');
                  // show animation in input
                  inputAnimation(targetClass);
                  // update allow
                  setPassSubmit({...passSubmit, name: false})
                } else {
                  // update allow
                  setPassSubmit({...passSubmit, name: true})
                }
                // Check if UserName is valid
                if (targetValue.length <= 4) {
                  // show msg about the problem
                  createUpMsg("red", 'This name is not valid');
                  // show animation in input
                  inputAnimation(targetClass);
                  // update allow
                  setPassSubmit({...passSubmit, name: false})
                } else {
                  // update allow
                  setPassSubmit({...passSubmit, name: true})
                }
              }

            } else if (targetValue.length > 20) {

              // show msg about the problem
              createUpMsg("red", 'This name is too long.');
              // show animation in input
              inputAnimation(targetClass);
              // update allow
              setPassSubmit({...passSubmit, name: false})

            } else {

              // update allow
              setPassSubmit({...passSubmit, name: false})
              
            }

          break;

          case "signUp-password":
          case "recover-password":

          // Check Password Strength.
            if (targetValue !== "" && targetValue.length <= 20) {

              if (targetValue.length >= 8 && targetValue.includes("@" || "#" || "!" || "$" || "%" || "&" || "*")) {
                // show msg about the problem
                createUpMsg("green", 'Your password is strong.');
                // update allow
                setPassSubmit({...passSubmit, password: true});
                //
                if (targetClass === "recover-password") {
                  setCurrentAccount({...currentAccount, password: target.value});
                }
              } else if (targetValue.length >= 8) {
                // show msg about the problem
                createUpMsg("none", 'Use one of the Symbols (@ # ! % $ & *) to make it strong.');
                // update allow
                setPassSubmit({...passSubmit, password: true});
                //
                if (targetClass === "recover-password") {
                  setCurrentAccount({...currentAccount, password: target.value});
                }
              } else if ((targetValue.length < 8)) {
                // show msg about the problem
                createUpMsg("red", 'Your password is Weak.');
                // show animation in input
                inputAnimation(targetClass);
                // update allow
                setPassSubmit({...passSubmit, password: false});
              }

            } else if (targetValue.length > 20) {

              // show msg about the problem
              createUpMsg("red", 'This password is too long.');
              // show animation in input
              inputAnimation("signUp-password");
              // update allow
              setPassSubmit({...passSubmit, password: false})

            } else {

              // update allow
              setPassSubmit({...passSubmit, password: false})
            }
          break;

          case "signUp-age":

          // Age Must Be Between 1 / 100
            if (targetValue !== "") {
              if (parseInt(targetValue) > 0 && parseInt(targetValue) <= 100) {
                // update allow
                setPassSubmit({...passSubmit, age: true});
              } else {
                // show msg about the problem
                createUpMsg("red", 'Age is not valid.');
                // show animation in input
                inputAnimation(targetClass);
                // update allow
                setPassSubmit({...passSubmit, age: false});
              }
            } else {
              // update allow
              setPassSubmit({...passSubmit, age: false})
            }

          break;

          case "signIn-name":
          case "recover-name":

            if (targetValue !== "") {

              let data = appData[1];
              let dataFilter = data.filter(x => x.userName === targetValue.trim());

              if (dataFilter.length > 0) {
                // Set current Account
                setCurrentAccount(...dataFilter);
                // update allow
                setPassSubmit({...passSubmit, name: true});
              } else {
                // Set current Account
                setCurrentAccount();
                // show msg about the problem
                createUpMsg("red", 'This name is not exist.');
                // show animation in input
                inputAnimation(targetClass);
                // update allow
                setPassSubmit({...passSubmit, name: false});
              }

            } else {

              // update allow
              setPassSubmit({...passSubmit, name: false})

            }

          break;

          case "signIn-password":

            if (targetValue !== "") {

              if (targetValue.trim() === currentAccount.password) {
                // update allow
                setPassSubmit({...passSubmit, password: true});
              } else {
                // show msg about the problem
                createUpMsg("red", "password isn't correct");
                // show animation in input
                inputAnimation(targetClass);
                // update allow
                setPassSubmit({...passSubmit, password: false});
                }

              } else {

                // update allow
                setPassSubmit({...passSubmit, password: false});

            }

          break;

          case "recover-age":
            if (targetValue !== "") {
              if (targetValue === currentAccount.age) {
                // update allow
                setPassSubmit({...passSubmit, age: true});
              } else {
                // show msg about the problem
                createUpMsg("red", "Age is not correct.");
                // show animation in input
                inputAnimation(targetClass);
                // update allow
                setPassSubmit({...passSubmit, age: false});
              }
            } else {
              // update allow
              setPassSubmit({...passSubmit, age: false});
            }
          break;

        }

      break;

      case FORM_ACTIONS.ADD_USER:

        displayLoader(e, "Account created successfully.", 2000);

        setTimeout(() => {
          let currentUserObj = appData[0];
          let arrayofUsers = appData[1];
          arrayofUsers.push(formData)
          let data = [currentUserObj, arrayofUsers];
          setAppData(data);
          setForm({...form, visibility: false,});
        }, 2600);

      break;

      case FORM_ACTIONS.LOG_IN:

        displayLoader(e, "Sign in successfully.", 2000);

        setTimeout(() => {
          setForm({...form, visibility: false,});
          setLoading(true);
          
          setTimeout(() => {
            let accountData = appData[0];
            accountData.currentUser = currentAccount.userName;
            accountData.idUser = currentAccount.id;
            let mergeData = [accountData, appData[1]];
            setAppData(mergeData);
            
            setTimeout(() => {
              setLoading(false);
              let users = appData[1];
              let currentData = {...appData[0], "animation": true};
              let data = [currentData, users];
              setAppData(data);

              setTimeout(() => {
                window.location.reload();
              }, 50);

            }, 5000);

          }, 0);

        }, 2600);

      break;

      case FORM_ACTIONS.CHANGE_PASSWORD:

        displayLoader(e, "Password successfully changed.", 2000);

        setTimeout(() => {

          let dataUsers = appData[1];
          let arrayWithOutMyAccount = dataUsers.filter(user => user.id !== currentAccount.id);
          arrayWithOutMyAccount.push(currentAccount);
          let data = [appData[0], arrayWithOutMyAccount];
          setAppData(data);
          // update allow
          setForm({...form, visibility: false,});
        }, 4000);

      break;
  
      default:
      return null;
    }
  }



  return (
    <div className='form backgroundBlur'>
        <div className='close' onClick={(e) => {clickAction(FORM_ACTIONS.CLOSE_FORM, e)}}>
          <Close />
        </div>
        <div className='form'>
          <div className='logo'>
              <LogoSvg />
              <span>rubber</span>
          </div>
          
          {form.CurrentForm === "signup" ? <SignUp clickAction={clickAction} passSubmit={passSubmit} createUpMsg={createUpMsg}/> : null }
          {form.CurrentForm === "signin" ? <SignIn clickAction={clickAction} toggleBetweenForms={toggleBetweenForms} passSubmit={passSubmit} createUpMsg={createUpMsg}/> : null }
          {form.CurrentForm === "recover" ? <RecoverPassword clickAction={clickAction} passSubmit={passSubmit} createUpMsg={createUpMsg}/> : null }

        </div>

    </div>
  )
}

export default Forms