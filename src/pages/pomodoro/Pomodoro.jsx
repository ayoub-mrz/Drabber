import React, { useState, useEffect } from 'react'
import StartSvg from '../../assets/StartSvg'
import PauseSvg from '../../assets/PauseSvg'
import StopSvg from '../../assets/StopSvg'
import ArrowForwardSvg from '../../assets/ArrowForwardSvg'
import myAudio from './../../assets/checkPomodoro.mp3'

function Pomodoro( {showSettings, setShowSettings, userProfile, createUpMsg, updatePomodoro} ) {

  function updatePomodoroSettings(firstValue, secondValue, target, e) {
    let targetValue = e.target.value;
    if (targetValue >= firstValue && targetValue <= secondValue) {
      userProfile.pomodoro[target] = parseInt(targetValue);
      updatePomodoro(userProfile)
    } else {
      createUpMsg('red', `its should be between ${firstValue} & ${secondValue}`)
    }
  }

  function resetAllInput() {
    let allInput = document.querySelectorAll('.inputs-container input')
    allInput.forEach(input => {
      input.value = '';
    })
  }

  let pomodoroValue = userProfile.pomodoro.pomodoro;
  let shortValue = userProfile.pomodoro.short;
  let longValue = userProfile.pomodoro.long;
  let everyValue = userProfile.pomodoro.every;

  ////////////////////////////////////////

  let head = document.querySelector('head title');

  const [timerMode, setTimerMode] = useState('pomodoro');
  
  const [timerStatus, setTimerStatus] = useState('stoped');
  
  const [timerMin, setTimerMin] = useState(pomodoroValue);
  
  let [duration, setDuration] = useState(timerMin * 60);
  
  let [pomodoroTimes, setPomodoroTimes] = useState(0);
  
  let longEvery = everyValue - 1;

  // Set Circle Percent
  let durationPercent = duration * 100 / (timerMin * 60);
  let circlePercent = 440 - (durationPercent * 440) / 100;

  //
  useEffect(() => {
    setDuration(timerMin * 60)
    document.querySelector('.timer-number').textContent 
    = `${timerMin < 10 ? '0' + timerMin : timerMin}:${'00'}`
  }, [timerMin, setTimerMin, timerMode])

  function timerActions(action) {
    switch (action) {
      case 'play':
        setTimerStatus('played')
        head.textContent = "Play"
      break;
      case 'pause':
          setTimerStatus('paused')
          head.textContent = "Pause"
      break;
      case 'stop':
        setTimerStatus('stoped')
        handlePomodoroLogic();
        head.textContent = "Stop"
      break;
    }
  }

  useEffect(() => {
    if (timerStatus === 'played') {
      const interval = setInterval(function () {

        let time = duration;
        let timerMinutes = Math.floor(time / 60);
        let timerSeconds = time % 60;

        if (--time <= 0) { 

          let audio = new Audio(myAudio);
          audio.play();

          // set mod to stoped
          setTimerStatus('stoped')

          handlePomodoroLogic();

          // reset Timer
          setDuration(timerMin * 60)

        } else {
          
          // Assign Minutes & Seconds
          document.querySelector('.timer-number').textContent 
          = `${timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}:${timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}`
          
          setDuration(duration--)

          // 


          //
          head.textContent
          = `${timerMode === 'pomodoro' ? 'Time to focus!' : 'Time to take a break'} - 
          ${timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}:${timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}`

        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerStatus])

  function handlePomodoroLogic() {
    if (timerMode === 'pomodoro' && pomodoroTimes < longEvery) {
      setPomodoroTimes(pomodoroTimes + 1);
      setTimerMode('short');
      setTimerMin(shortValue);
    } else if (timerMode === 'short') {
      setTimerMode('pomodoro');
      setTimerMin(pomodoroValue);
    } else if (timerMode === 'pomodoro' && pomodoroTimes === longEvery) {
      setPomodoroTimes(0);
      setTimerMode('long');
      setTimerMin(longValue);
    } else if (timerMode === 'long') {
      setTimerMode('pomodoro');
      setTimerMin(pomodoroValue);
    }
    
  }


  return (
    <div className="pomodoroSection">
      
      <div className={!showSettings ? 'pomodoro-container fullWidth' : 'pomodoro-container'}>
        <div className="head">
          <ul>
            <li className={timerMode === 'pomodoro' ? 'active' : ''}>Pomodoro</li>
            <li className={timerMode === 'short' ? 'active' : ''}>Short Break</li>
            <li className={timerMode === 'long' ? 'active' : ''}>Long Break</li>
          </ul>
        </div>
        <div className="timer-container">
          <div className="timer-number">{timerMin < 10 ? '0' + timerMin : timerMin}:00</div>
          <div className="timer-btns">

            {timerStatus === 'stoped' ?
            <div className="start" onClick={() => {timerActions('play')}}>
              <StartSvg />
            </div>
            : timerStatus === 'played' ?
              <div className="pause" onClick={() => {timerActions('pause')}}>
                <PauseSvg />
              </div>
            : timerStatus === 'paused' ?
              <div className="btn-container">
                <div className="resume" onClick={() => {timerActions('play')}}>
                  <StartSvg />
                </div>
                <div className="line"></div>
                <div className="stop" onClick={() => {timerActions('stop')}}>
                  <StopSvg />
                </div>
              </div>
            : null}

          </div>

          <div className="timer-circle">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                      <defs>
                          <linearGradient id="GradientColor">
                              <stop offset="0%" stopColor="#e91e63" />
                              <stop offset="100%" stopColor="#673ab7" />
                          </linearGradient>
                      </defs>
                      <circle cx="80" cy="80" r="70" strokeLinecap="round" strokeDashoffset={circlePercent} />
              </svg>
          </div>
        </div>
      </div>

      <div className={showSettings ? 'settings-container' : 'settings-container hide'}>
        <div className="head">
          <h4>Settings</h4>
          <div className="hide-btn" onClick={() => {setShowSettings(false); resetAllInput()}}><ArrowForwardSvg /></div>
        </div>
        <div className="inputs-container">
          <div className="input-bar">
            <div className="title">Pomodoro</div>
            <div className="input-taker">
              <input type="number" placeholder={pomodoroValue} onChange={(e) => {updatePomodoroSettings(5, 120, 'pomodoro', e)}}/>
            </div>
          </div>
          <div className="input-bar">
            <div className="title">Short Break</div>
            <div className="input-taker">
              <input type="number" placeholder={shortValue} onChange={(e) => {updatePomodoroSettings(1, 30, 'short', e)}}/>
            </div>
          </div>
          <div className="input-bar">
            <div className="title">Long Break</div>
            <div className="input-taker">
              <input type="number" placeholder={longValue} onChange={(e) => {updatePomodoroSettings(15, 90, 'long', e)}}/>
            </div>
          </div>
          <div className="input-bar">
            <div className="title">Long Break Every</div>
            <div className="input-taker">
              <input type="number" placeholder={everyValue} onChange={(e) => {updatePomodoroSettings(1, 10, 'every', e)}}/>
              <span>pomo</span>
            </div>
          </div>
        </div>
        <div className="pomodoro-info">
          <div className="info-bar pomoNum">
            <div className="title">Pomo</div>
            <div className="value">{pomodoroTimes}</div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Pomodoro