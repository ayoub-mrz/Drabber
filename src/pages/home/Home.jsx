/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Ellipsis from '../../assets/Ellipsis'
import Reward from './../../components/reward/Reward'
import Trophy from './../../assets/Trophy'
import CircleStatus from './../../components/circle-status/CircleStatus'
import ReportStatus from './../../components/report-status/ReportStatus'
import Option from './../../assets/Ellipsis'
import GarbageSvg from './../../assets/TrashSvg'

function Home( {popup, togglePopup, userProfile, reward, setReward, toggleOption, deleteGoal} ) {

  return (
    <div className='homeSection'>
      <div className='goals-progress'>
        <div className='today-progress'>
          <div className='head'>
            <h2 className='title underline'>Today Progress</h2>
          </div>
          <div className='progress-ctn'>
            <div className='setting popUpMenu' onClick={() => {togglePopup("reward")}}>
              <Ellipsis />
            </div>
            
            {popup.Reward ? <Reward reward={reward} setReward={setReward}/> : null}

            <span className='progress-count'>
              {reward.percent === null ? 0 
              : isNaN(reward.percent) ? 0
              : reward.percent }
              %</span>
            <div className='progress-bar'>
              <div className={reward.percent >= 99 ? 'progress-line borderFinish' : 'progress-line'} style={{width: `${reward.percent}%`}}></div>
              <Trophy color={"#ac4313"} left={`calc(${reward.bronze}% - (45px / 2))`} classTrophy={reward.percent >= reward.bronze ? "hasDone" : ""}/>
              <Trophy color={"#ffd701"} left={`calc(${reward.gold}% - (45px / 2))`} classTrophy={reward.percent >= reward.gold ? "hasDone" : ""}/>
              <Trophy color={"#09c8f4"} left={`calc(${reward.diamond}% - (45px / 2))`} classTrophy={reward.percent >= reward.diamond ? "hasDone" : ""}/>
            </div>
          </div>
        </div>
        <div className='goals-cards'>
          <div className='head'>
            <h2 className='title underline'>All Goals</h2>
          </div>
          <div className='card-container'>
            {userProfile[0].goals.map(goal => {
              return (
                <div className={goal.itsDone ? "goal-card complete": "goal-card"} title={`Start at (${goal.startAt}), Finished at (${goal.endAt !== "" ? goal.endAt : "Not yet"})`} key={goal.id}>

                  <div className='card-title'>{goal.title}</div>
                  <div className='card-progress'>
                    <div className={`progress ${goal.goalRate > 98 ? "correct-BR" : ""}`} style={{width: `${goal.goalRate}%`}}>
                      <div className='progress-percent' style={{left: `calc(${goal.goalRate}% - 25px)`}}>{goal.goalRate}%</div>
                    </div>
                  </div>

                  {goal.itsDone ? 
                    <div className='glass-effect'></div> : null
                  }

                  {goal.itsDone ? 
                    <div className="option popUpMenu">
                      <div className='option-btn popUpMenu' onClick={() => {toggleOption(goal.id)}}><Option /></div>
                      <div className="option-container popUpMenu">
    
                        {popup.taskMore ? 
                          <div id={goal.id} className="popup-option hide popUpMenu">
                            <div className="delete popUpMenu" onClick={() => {deleteGoal(goal.id)}}><GarbageSvg />Delete Task</div>
                          </div>
                        : null}
    
                      </div>
                    </div>
                    : null}
                        
              </div>
              )
            })}
          </div>
        </div>
      </div>
      
      <div className='goals-status'>
        <CircleStatus userProfile={userProfile}/>
        <ReportStatus userProfile={userProfile}/>
      </div>
    </div>
  )
}

export default Home