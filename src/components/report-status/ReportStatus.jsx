import React from 'react'

function ReportStatus( {userProfile} ) {

  let thisWeekInfo = userProfile[0].thisWeek;

  let values = {
    "monday": thisWeekInfo.monday.filter(task => task.state === "done").length,
    "tuesday": thisWeekInfo.tuesday.filter(task => task.state === "done").length,
    "wednesday": thisWeekInfo.wednesday.filter(task => task.state === "done").length,
    "thursday": thisWeekInfo.thursday.filter(task => task.state === "done").length,
    "friday": thisWeekInfo.friday.filter(task => task.state === "done").length,
    "saturday": thisWeekInfo.saturday.filter(task => task.state === "done").length,
    "sunday": thisWeekInfo.sunday.filter(task => task.state === "done").length
  }


  function setHeight(dayValue) {
    return dayValue === 0 ? dayValue : dayValue > 10 ? 100 : dayValue * 10
  }

  return (
    <div className='report-status'>
      <h2>Report</h2>
      <div className='statistic-container'>
        <div className='line-vertical'>
          <div className='half'><span className='num'>5</span> <span className='line'></span></div>
          <div className='full'><span className='num'>10</span> <span className='line'></span></div>
          <div className='start'><span className='num'>0</span></div>
        </div>
        <div className='line-horizontal'></div>
        <div className='columns-container'>
          <div className='empty'></div>
          <div className='mo' style={{height: `${setHeight(values.monday)}%`}}><span className='day'>mo</span> <span className='num-task'>{values.monday}</span></div>
          <div className='empty'></div>
          <div className='tu' style={{height: `${setHeight(values.tuesday)}%`}}><span className='day'>tu</span> <span className='num-task'>{values.tuesday}</span></div>
          <div className='empty'></div>
          <div className='we' style={{height: `${setHeight(values.wednesday)}%`}}><span className='day'>we</span> <span className='num-task'>{values.wednesday}</span></div>
          <div className='empty'></div>
          <div className='th' style={{height: `${setHeight(values.thursday)}%`}}><span className='day'>th</span> <span className='num-task'>{values.thursday}</span></div>
          <div className='empty'></div>
          <div className='fr' style={{height: `${setHeight(values.friday)}%`}}><span className='day'>fr</span> <span className='num-task'>{values.friday}</span></div>
          <div className='empty'></div>
          <div className='sa' style={{height: `${setHeight(values.saturday)}%`}}><span className='day'>sa</span> <span className='num-task'>{values.saturday}</span></div>
          <div className='empty'></div>
          <div className='su' style={{height: `${setHeight(values.sunday)}%`}}><span className='day'>su</span> <span className='num-task'>{values.sunday}</span></div>
        </div>
      </div>
    </div>
  )
}

export default ReportStatus