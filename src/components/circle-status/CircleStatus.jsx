import React from 'react'

function CircleStatus( {userProfile} ) {

  let week = userProfile[0].thisWeek;
  let NotEmptyWeek = 0;
  Object.keys(week).forEach(day => {
    if (week[day].length > 0) {
      NotEmptyWeek++;
    }
  }) 
  
  let weekPercent = userProfile[0].currentWeek.percent
  
  let circlePercent = 440 * weekPercent / 100

  return (
    <div className='circle-status' title='Week Progress'>
      {NotEmptyWeek > 0 ? 
        <div className='circle-background'>
          <div className='circle-text'>{`${weekPercent}%`}</div>
          <div className='circle-progress'>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
              <defs>
                  <linearGradient id="GradientColor">
                      <stop offset="0%" stopColor="#e91e63" />
                      <stop offset="100%" stopColor="#673ab7" />
                  </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="70" strokeLinecap="round" strokeDashoffset={440 - circlePercent} />
            </svg>
          </div>
        </div>
    : 
    <p className='no-goals'>You don't have tasks yet</p>
    }
    </div>
  )
}

export default CircleStatus