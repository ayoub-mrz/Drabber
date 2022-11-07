import React from 'react'
import SwitchTheme from './../../components/switchTheme/SwitchTheme';
import user from './../../assets/ayoub.jpg';
import UserSvg from './../../assets/user';
import Account from './../../components/account/Account';

function Navbar( {appData, mainTheme, setMainTheme, popup, togglePopup, apdateData, currentSection, logOut} ) {


  return (
    <div className={appData[0].animation ? "navbar unsetTransform" : "navbar"}>
        <div className={currentSection === "" ? "title-section hide" : "title-section"}>
            <h1>            
            {
            currentSection === "goal" ? `${currentSection}:`
            : currentSection === "today" ? `${currentSection}:`
            : currentSection}
            </h1>
            <span className={
            currentSection === "goal" ? 'overFlow-text-hide'
            : currentSection === "today" ? 'overFlow-text-hide'
            : 'overFlow-text-hide hide'}></span>
        </div>
        <div className='btn-ctn dataUpdate'>
          <SwitchTheme mainTheme={mainTheme} setMainTheme={setMainTheme} apdateData={apdateData} storage={"local"}/>
          <div className='user-photo popUpMenu'>
            <div className='pic popUpMenu' onClick={() => {togglePopup("account")}}>
              <UserSvg  className="popUpMenu"/>
              <img src={user} alt="user" className='popUpMenu'/>
            </div>
            {popup.Account ? <Account mainTheme={mainTheme} setMainTheme={setMainTheme} appData={appData} apdateData={apdateData} logOut={logOut}/> : null}
          </div>
        </div>
    </div>
  )
}

export default Navbar