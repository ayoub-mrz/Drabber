import React from 'react'
import AppSvg from './../../assets/AppSvg'
import Cursor from './../../assets/cursor.png'

function IntroSection({appData}) {

  return (
    <div className="intro-section">
      <div className={appData[0].animation ? "intro-content unsetTransform" : "intro-content"}>
        <div className='imgs'>
          <AppSvg />
          {/* <img src={Cursor} alt='cursor'/> */}
        </div>
        {/* <h3>You can transform between sections in SideBar.</h3> */}
      </div>
    </div>
  )
}

export default IntroSection